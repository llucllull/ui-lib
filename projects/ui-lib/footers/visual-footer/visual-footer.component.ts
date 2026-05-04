import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLibAddressI, UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';

@Component({
    selector: 'lib-visual-footer',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective],
    templateUrl: './visual-footer.component.html',
    styleUrl: './visual-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        style: 'display: contents',
    },
})
export class VisualFooterComponent {
    @Input() contactTitle?: string;
    @Input() contactPhone?: UiLibButtonI;
    @Input() contactEmail?: UiLibButtonI;
    @Input() addressTitle?: string;
    @Input() address?: UiLibAddressI;
    @Input() socialsTitle?: string;
    @Input() socials?: UiLibButtonI[];
    @Input() image?: UiLibImageI;
}
