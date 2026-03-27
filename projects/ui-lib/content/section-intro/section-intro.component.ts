import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibButtonI } from '@lluc_llull/ui-lib/interfaces';
import { UiIconComponent } from '@lluc_llull/ui-lib/shared';

@Component({
    selector: 'lib-section-intro',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective, UiIconComponent],
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
