import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective } from '../../../../directives/link-type.directive';
import { UiLibButtonI } from '../../../../interfaces/ui-lib-button.interface';

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
