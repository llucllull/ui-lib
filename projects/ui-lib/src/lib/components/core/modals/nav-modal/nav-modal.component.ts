import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
    UiLibNavItemsI,
    UiLibSocialItemsI,
} from '@lluc_llull/ui-lib/interfaces';
import { LinkTypeDirective } from '../../../../../../directives/link-type.directive';

@Component({
    selector: 'lib-nav-modal',
    standalone: true,
    imports: [CommonModule, LinkTypeDirective],
    templateUrl: './nav-modal.component.html',
    styleUrl: './nav-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavModalComponent {
    @Input() navItems?: UiLibNavItemsI[];
    @Input() socialItems?: UiLibSocialItemsI[];

    @Output() close = new EventEmitter<void>();

    closeModal() {
        this.close.emit();
    }
}
