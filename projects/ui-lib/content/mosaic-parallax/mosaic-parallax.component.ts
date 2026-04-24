import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'app-mosaic-parallax',
    templateUrl: './mosaic-parallax.component.html',
    styleUrls: ['./mosaic-parallax.component.scss'],
})
export class MosaicParallaxComponent implements AfterViewInit, OnDestroy {
    @Input() title?: string;
    @Input() text?: string;
    @Input() images?: UiLibImageI[];

    @ViewChild('mosaicSection') mosaicSection!: ElementRef<HTMLElement>;

    isVisible = false;
    private observer?: IntersectionObserver;
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngAfterViewInit() {
        if (!this.isBrowser) return;

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !this.isVisible) {
                    this.isVisible = true;
                    this.observer?.disconnect(); // solo una vez
                }
            },
            { threshold: 0.15 }, // dispara cuando el 15% del componente es visible
        );

        this.observer.observe(this.mosaicSection.nativeElement);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
