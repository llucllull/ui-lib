import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective } from '@lluc_llull/ui-lib';
import { UiLibButtonI } from '@lluc_llull/ui-lib';

@Component({
    selector: 'lib-section-intro',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective],
    templateUrl: './section-intro.component.html',
    styleUrl: './section-intro.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionIntroComponent {
    @Input() pretitle?: string;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() text?: string;
    @Input() button?: UiLibButtonI;
}
