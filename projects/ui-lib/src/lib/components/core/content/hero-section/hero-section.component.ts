import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibButtonI } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'lib-hero-section',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective],
    templateUrl: './hero-section.component.html',
    styleUrl: './hero-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
    @Input() pretitle?: string;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() text?: string;
    @Input() buttons?: UiLibButtonI[];
    @Input() highlight?: string;
}
