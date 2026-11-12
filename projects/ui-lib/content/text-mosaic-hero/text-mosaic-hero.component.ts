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

const MAX_TILES = 18;

@Component({
    selector: 'lib-text-mosaic-hero',
    standalone: true,
    imports: [UiImageComponent],
    templateUrl: './text-mosaic-hero.component.html',
    styleUrl: './text-mosaic-hero.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class TextMosaicHeroComponent implements AfterViewInit, OnDestroy {
    @Input() title = 'WHO DAAT BOY';
    @Input() images?: UiLibImageI[];

    @ViewChild('section') section?: ElementRef<HTMLElement>;

    readonly isVisible = signal(false);
    readonly maxTiles = MAX_TILES;

    private observer?: IntersectionObserver;
    private readonly isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    get visibleImages(): UiLibImageI[] {
        return this.images?.slice(0, MAX_TILES) ?? [];
    }

    ngAfterViewInit(): void {
        if (!this.isBrowser) return;

        const target = this.section?.nativeElement;
        const prefersReducedMotion =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion || !target || typeof IntersectionObserver === 'undefined') {
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
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
        );

        this.observer.observe(target);
    }

    ngOnDestroy(): void {
        if (!this.isBrowser) return;

        this.observer?.disconnect();
    }
}
