import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LinkTypeDirective } from '@lluc_llull/ui-lib';
import { UiLibButtonI } from '@lluc_llull/ui-lib';

export type LegalFooterVariant = 'simple' | 'extended';

@Component({
    selector: 'lib-legal-footer',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective],
    templateUrl: './legal-footer.component.html',
    styleUrl: './legal-footer.component.scss',
})
export class LegalFooterComponent {
    @Input() year?: number;
    @Input() brand?: string;
    @Input() credits?: string;
    @Input() links?: UiLibButtonI[];
    @Input() variant: LegalFooterVariant = 'simple';
}
