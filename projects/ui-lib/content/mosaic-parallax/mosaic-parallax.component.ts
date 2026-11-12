import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    PLATFORM_ID,
    signal,
    ViewChild,
} from '@angular/core';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { UiImageComponent } from '@lluc_llull/ui-lib/shared';

const DESKTOP_QUERY = '(min-width: 1024px)';
const MAX_PIN_VIEWPORTS = 2;
const ENTER_STAGGER_MS = 80;
const MAX_DIAGONAL_PX = 280;
const DIAGONAL_SAFETY_PX = 24;
const HEADER_GAP_PX = 24;

@Component({
    selector: 'app-mosaic-parallax',
    standalone: true,
    imports: [UiImageComponent],
    templateUrl: './mosaic-parallax.component.html',
    styleUrls: ['./mosaic-parallax.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class MosaicParallaxComponent implements AfterViewInit, OnDestroy {
    @Input() title?: string;
    @Input() text?: string;
    @Input() images?: UiLibImageI[];

    @ViewChild('mosaicSection') mosaicSection!: ElementRef<HTMLElement>;
    @ViewChild('stage') stage?: ElementRef<HTMLElement>;
    @ViewChild('sticky') sticky?: ElementRef<HTMLElement>;
    @ViewChild('header') header?: ElementRef<HTMLElement>;
    @ViewChild('track') track?: ElementRef<HTMLElement>;

    readonly isVisible = signal(false);
    readonly enterStagger = ENTER_STAGGER_MS;

    private observer?: IntersectionObserver;
    private resizeObserver?: ResizeObserver;
    private mediaQuery?: MediaQueryList;
    private readonly isBrowser: boolean;
    private frame = 0;
    private maxShift = 0;
    private scrollDistance = 0;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    /**
     * Normalized position of each card along the ascending diagonal:
     * 0 is the bottom-left card, 1 the top-right one. Linear and bounded,
     * so any number of items keeps a single left-to-right upward diagonal.
     */
    diagonalFraction(index: number): number {
        const count = this.images?.length ?? 0;
        if (count < 2) return 0;
        return index / (count - 1);
    }

    ngAfterViewInit(): void {
        if (!this.isBrowser) return;

        const prefersReducedMotion =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            this.isVisible.set(true);
            return;
        }

        this.observeEntrance();
        this.initSlider();
    }

    ngOnDestroy(): void {
        if (!this.isBrowser) return;

        this.observer?.disconnect();
        this.stopSlider();
        this.mediaQuery?.removeEventListener('change', this.onBreakpointChange);
        if (this.frame) cancelAnimationFrame(this.frame);
    }

    private observeEntrance(): void {
        const target = this.stage?.nativeElement ?? this.mosaicSection?.nativeElement;

        if (!target || typeof IntersectionObserver === 'undefined') {
            this.isVisible.set(true);
            return;
        }

        this.observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    this.isVisible.set(true);
                    this.observer?.disconnect();
                }
            },
            { threshold: 0, rootMargin: '0px 0px -50% 0px' },
        );

        this.observer.observe(target);
    }

    private initSlider(): void {
        if (typeof window.matchMedia !== 'function' || typeof ResizeObserver === 'undefined') {
            return;
        }

        this.mediaQuery = window.matchMedia(DESKTOP_QUERY);
        this.mediaQuery.addEventListener('change', this.onBreakpointChange);

        if (this.mediaQuery.matches) {
            this.startSlider();
        }
    }

    private startSlider(): void {
        const stage = this.stage?.nativeElement;
        const track = this.track?.nativeElement;

        if (!stage || !track) return;

        this.mosaicSection?.nativeElement.classList.add('mosaic-parallax--slider');

        if (!this.resizeObserver) {
            this.resizeObserver = new ResizeObserver(() => this.measure());
        }

        this.resizeObserver.observe(track);
        this.resizeObserver.observe(stage);
        if (this.header?.nativeElement) {
            this.resizeObserver.observe(this.header.nativeElement);
        }

        window.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onResize);

        this.measure();
    }

    private stopSlider(): void {
        this.resizeObserver?.disconnect();

        if (this.isBrowser) {
            window.removeEventListener('scroll', this.onScroll);
            window.removeEventListener('resize', this.onResize);
        }

        if (this.frame) {
            cancelAnimationFrame(this.frame);
            this.frame = 0;
        }

        this.resetSlider();
    }

    private resetSlider(): void {
        this.mosaicSection?.nativeElement.classList.remove('mosaic-parallax--slider');
        this.stage?.nativeElement.style.removeProperty('--scroll-distance');

        if (this.track) {
            this.track.nativeElement.style.removeProperty('--diagonal-total');
            this.track.nativeElement.style.transform = '';
        }

        this.maxShift = 0;
        this.scrollDistance = 0;
    }

    private measure(): void {
        const stage = this.stage?.nativeElement;
        const sticky = this.sticky?.nativeElement;
        const track = this.track?.nativeElement;

        if (!stage || !sticky || !track || !this.mediaQuery?.matches) {
            this.resetSlider();
            return;
        }

        this.fitDiagonal(sticky, track);
        this.maxShift = Math.max(0, track.scrollWidth - sticky.clientWidth);
        this.scrollDistance = Math.min(this.maxShift, window.innerHeight * MAX_PIN_VIEWPORTS);

        stage.style.setProperty('--scroll-distance', `${this.scrollDistance}px`);
        this.update();
    }

    /**
     * The whole diagonal (lowest card top to highest card top) must fit
     * inside the pinned viewport, whatever the item count. With a header
     * the diagonal is sized to its height plus a gap, so the first card
     * sits just below the text and the following cards rise beside it.
     */
    private fitDiagonal(sticky: HTMLElement, track: HTMLElement): void {
        const firstCard = track.querySelector<HTMLElement>('.mosaic-item');

        if (!firstCard) return;

        const { paddingTop, paddingBottom } = getComputedStyle(sticky);
        const innerHeight =
            sticky.clientHeight - (parseFloat(paddingTop) || 0) - (parseFloat(paddingBottom) || 0);
        const available = Math.max(0, innerHeight - firstCard.offsetHeight - DIAGONAL_SAFETY_PX);

        const header = this.header?.nativeElement;
        const target = header ? header.offsetHeight + HEADER_GAP_PX : MAX_DIAGONAL_PX;
        const diagonal = Math.min(target, available);

        track.style.setProperty('--diagonal-total', `${Math.round(diagonal)}px`);
    }

    private update(): void {
        const stage = this.stage?.nativeElement;
        const track = this.track?.nativeElement;

        if (!stage || !track) return;

        if (!this.mediaQuery?.matches || this.scrollDistance <= 0) {
            track.style.transform = 'translate3d(0, 0, 0)';
            return;
        }

        const { top } = stage.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -top / this.scrollDistance));
        const shift = -progress * this.maxShift;

        track.style.transform = `translate3d(${shift.toFixed(2)}px, 0, 0)`;
    }

    private readonly onScroll = (): void => {
        if (this.frame) return;

        this.frame = requestAnimationFrame(() => {
            this.frame = 0;
            this.update();
        });
    };

    private readonly onResize = (): void => {
        this.measure();
    };

    private readonly onBreakpointChange = (): void => {
        if (this.mediaQuery?.matches) {
            this.startSlider();
        } else {
            this.stopSlider();
        }
    };
}
