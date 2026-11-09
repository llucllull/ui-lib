import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';

@Component({
    selector: 'lib-content-document',
    imports: [CommonModule, ScrollRevealDirective],
    templateUrl: './content-document.component.html',
    styleUrl: './content-document.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class ContentDocumentComponent {
  @Input() title?: string;
  @Input() items?: ContentDocumentItemI[];
}

export interface ContentDocumentItemI {
  title: string;
  text: string;
}
