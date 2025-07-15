import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LangModalComponent } from "../lang-modal";
import { NavModalComponent } from "../nav-modal";
import { UiLibImageI } from '../../../interfaces/ui-lib-image.interface';
import { UiLibNavItemsI } from '../../../interfaces/ui-lib-nav-items.interface';

@Component({
  selector: 'lib-header-clear',
  standalone: true,
  imports: [CommonModule, LangModalComponent, NavModalComponent],
  templateUrl: './header-clear.component.html',
  styleUrl: './header-clear.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderClearComponent {
  @Input() logo?: UiLibImageI;
  @Input() lang?: string;
  @Input() navItems?: UiLibNavItemsI[];

  @Output() langModal = new EventEmitter<void>();
  @Output() theme = new EventEmitter<void>();

  openLanguagesModal(): void {
    this.langModal.emit();
  }

  toggleTheme(): void {
    this.theme.emit();
  }

  toggleMenu(): void {
    console.log('menu open');
  }
}
