import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UiLibNavItemsI } from '../../../interfaces/ui-lib-nav-items.interface';
import { LangModalComponent } from '../lang-modal/lang-modal.component';
import { NavModalComponent } from '../nav-modal/nav-modal.component';
import { UiLibImageI } from '../../../interfaces/ui-lib-image.interface';
import { LinkTypeDirective } from '../../../directives/link-type.directive';
import { UiLibButtonI } from '../../../interfaces/ui-lib-button.interface';

@Component({
  selector: 'lib-header-mobile',
  standalone: true,
  imports: [CommonModule, LangModalComponent, NavModalComponent, LinkTypeDirective],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMobileComponent {
  isMenuOpen = false;

  @Input() logo?: UiLibImageI;
  @Input() lang?: string;
  @Input() navItems?: UiLibNavItemsI[];
  @Input() homeLink?: UiLibButtonI;

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
