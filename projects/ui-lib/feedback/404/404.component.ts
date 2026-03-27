import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLibButtonI } from '@lluc_llull/ui-lib/interfaces';
import { LinkTypeDirective, HighlightDirective } from '@lluc_llull/ui-lib/directives';
import { UiIconComponent } from '@lluc_llull/ui-lib/shared';

@Component({
    selector: 'lib-404',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective, HighlightDirective, UiIconComponent],
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
