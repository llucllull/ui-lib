import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
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

@Component({
    selector: 'app-mosaic-parallax',
    standalone: true,
    imports: [UiImageComponent],
    templateUrl: './mosaic-parallax.component.html',
    styleUrls: ['./mosaic-parallax.component.scss'],
    host: {
        style: 'display: contents',
    },
})
export class MosaicParallaxComponent implements AfterViewInit, OnDestroy {
    @Input() title?: string;
    @Input() text?: string;
    @Input() images?: UiLibImageI[];

    @ViewChild('mosaicSection') mosaicSection!: ElementRef<HTMLElement>;

    isVisible = signal(false);
    private observer?: IntersectionObserver;
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngAfterViewInit() {
        if (!this.isBrowser) return;

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !this.isVisible()) {
                    this.isVisible.set(true);
                    this.observer?.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        this.observer.observe(this.mosaicSection.nativeElement);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
