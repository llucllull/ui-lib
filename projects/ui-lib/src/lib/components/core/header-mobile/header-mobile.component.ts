import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UiLibNavItemsI } from '../../../interfaces/ui-lib-nav-items.interface';
import { LangModalComponent } from '../lang-modal/lang-modal.component';
import { NavModalComponent } from '../nav-modal/nav-modal.component';

@Component({
  selector: 'lib-header-mobile',
  standalone: true,
  imports: [CommonModule, LangModalComponent, NavModalComponent],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMobileComponent {
  isMenuOpen = false;

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
    this.isMenuOpen = !this.isMenuOpen;
  }
}
