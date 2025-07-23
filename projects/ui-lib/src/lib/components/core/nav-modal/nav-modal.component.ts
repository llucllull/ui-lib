import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UiLibNavItemsI } from '../../../interfaces/ui-lib-nav-items.interface';
import { LinkTypeDirective } from '../../../directives/link-type.directive';

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
  @Input() socialItems?: UiLibNavItemsI[];

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
