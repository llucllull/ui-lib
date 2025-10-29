import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LinkTypeDirective } from '../../../../directives';
import { UiLibButtonI } from '../../../../interfaces';

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
