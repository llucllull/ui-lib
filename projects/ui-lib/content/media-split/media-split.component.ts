import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    Inject,
    Input,
    PLATFORM_ID,
    signal,
} from '@angular/core';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'lib-media-split',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './media-split.component.html',
    styleUrl: './media-split.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaSplitComponent {
    @Input() title?: string;
    @Input() text?: string;
    @Input() images?: UiLibImageI[];

    activeImageIndex = signal(0);
    imageLoaded = signal(false);

    constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
        effect(() => {
            this.activeImageIndex();

            if (!isPlatformBrowser(this.platformId)) return;

            this.imageLoaded.set(false);

            requestAnimationFrame(() => {
                this.imageLoaded.set(true);
            });
        });
    }

    currentImage = computed(() => {
        const imgs = this.images ?? [];
        return imgs[this.activeImageIndex()] ?? null;
    });

    updateActiveImage(index: number) {
        this.activeImageIndex.set(index);
    }

    resetImage() {
        this.activeImageIndex.set(0);
    }

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) return;

        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => {
                this.preloadImages();
            });
        } else {
            setTimeout(() => this.preloadImages(), 2000);
        }
    }

    private preloadImages() {
        this.images?.slice(1).forEach((img) => {
            const i = new Image();
            i.src = img.url;
        });
    }
}
