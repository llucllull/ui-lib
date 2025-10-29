import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScreenSizerService {
    readonly breakpoints = {
        xs: 480,
        sm: 768,
        md: 1024,
        lg: 1280,
        xl: 1536,
    };

    readonly isXs = signal(false);
    readonly isSm = signal(false);
    readonly isMd = signal(false);
    readonly isLg = signal(false);
    readonly isXl = signal(false);

    readonly minSm = signal(false);
    readonly minMd = signal(false);
    readonly minLg = signal(false);
    readonly minXl = signal(false);

    private readonly platformId = inject(PLATFORM_ID);

    get width(): number {
        if (isPlatformBrowser(this.platformId)) {
            return Math.min(window.innerWidth, window.outerWidth);
        }
        return 0;
    }

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            fromEvent(window, 'resize')
                .pipe(
                    debounceTime(200),
                    map(() => this.width),
                    distinctUntilChanged(),
                    startWith(this.width),
                )
                .subscribe((width) => this.updateFlags(width));
        }
    }

    private updateFlags(width: number) {
        const { xs, sm, md, lg, xl } = this.breakpoints;

        this.isXs.set(width < sm);
        this.isSm.set(width >= sm && width < md);
        this.isMd.set(width >= md && width < lg);
        this.isLg.set(width >= lg && width < xl);
        this.isXl.set(width >= xl);

        this.minSm.set(width >= sm);
        this.minMd.set(width >= md);
        this.minLg.set(width >= lg);
        this.minXl.set(width >= xl);
    }

    // Métodos rápidos si no usas signals directamente
    isXsInstant() {
        return this.isXs();
    }
    isSmInstant() {
        return this.isSm();
    }
    isMdInstant() {
        return this.isMd();
    }
    isLgInstant() {
        return this.isLg();
    }
    isXlInstant() {
        return this.isXl();
    }

    minSmInstant() {
        return this.minSm();
    }
    minMdInstant() {
        return this.minMd();
    }
    minLgInstant() {
        return this.minLg();
    }
    minXlInstant() {
        return this.minXl();
    }
}
