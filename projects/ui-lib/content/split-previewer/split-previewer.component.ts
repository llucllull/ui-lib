import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { HighlightDirective, LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'lib-split-previewer',
    imports: [CommonModule, LinkTypeDirective, HighlightDirective],
    templateUrl: './split-previewer.component.html',
    styleUrl: './split-previewer.component.scss',
})
export class SplitPreviewerComponent {
    @Input() title?: string;
    @Input() items?: SplitPreviewerItemI[];
    @Input() imageDefault?: UiLibImageI;
    @Input() direction: 'left' | 'right' = 'right';

    activeImage = signal<string | undefined>(undefined);

    get count(): number {
        return this.items?.length || 0;
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
