import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import {
    HighlightDirective,
    LinkTypeDirective,
    ScrollRevealDirective,
} from '@lluc_llull/ui-lib/directives';
import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'lib-split-previewer',
    imports: [CommonModule, LinkTypeDirective, HighlightDirective, ScrollRevealDirective],
    templateUrl: './split-previewer.component.html',
    styleUrl: './split-previewer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class SplitPreviewerComponent implements OnInit {
    @Input() title?: string;
    @Input() items?: SplitPreviewerItemI[];
    @Input() imageDefault?: UiLibImageI;
    @Input() direction: 'left' | 'right' = 'right';

    activeImage = signal<string | undefined>(undefined);

    get count(): number {
        return this.items?.length || 0;
    }

    constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

    ngOnInit() {
        if (!this.items) return;
        if (!isPlatformBrowser(this.platformId)) return;
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => {
                this.items?.forEach((item) => {
                    if (item.image?.url) {
                        const img = new Image();
                        img.src = item.image.url;
                    }
                });
            });
        }
    }
}

export interface SplitPreviewerItemI {
    title?: string;
    type?: string;
    description?: string;
    tags?: string[];
    link?: UiLibButtonI;
    image?: UiLibImageI;
}
