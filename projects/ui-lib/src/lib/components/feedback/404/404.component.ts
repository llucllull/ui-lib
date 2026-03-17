import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkTypeDirective } from '@lluc_llull/ui-lib';
import { UiLibButtonI } from '@lluc_llull/ui-lib';

@Component({
    selector: 'lib-404',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective],
    templateUrl: './404.component.html',
    styleUrl: './404.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() highlight?: string;
    @Input() button?: UiLibButtonI;
}
