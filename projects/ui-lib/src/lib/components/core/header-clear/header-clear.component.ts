import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinkTypeDirective } from '../../../directives';
import { UiLibButtonI } from '../../../interfaces/ui-lib-button.interface';
import { UiLibImageI } from '../../../interfaces/ui-lib-image.interface';
import { UiLibNavItemsI } from '../../../interfaces/ui-lib-nav-items.interface';
import { LangModalComponent } from "../lang-modal";
import { NavModalComponent } from "../nav-modal";
import { Theme, ThemeService } from '../../../services/theme';

@Component({
  selector: 'lib-header-clear',
  standalone: true,
  imports: [CommonModule, LangModalComponent, NavModalComponent, LinkTypeDirective],
  templateUrl: './header-clear.component.html',
  styleUrl: './header-clear.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderClearComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  currentTheme: Theme = 'light';
  private themeSubscription?: Subscription;
  
  @Input() logo?: UiLibImageI;
  @Input() lang?: string;
  @Input() navItems?: UiLibNavItemsI[];
  @Input() homeLink?: UiLibButtonI;

  @Output() langModal = new EventEmitter<void>();
  @Output() theme = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  openLanguagesModal(): void {
    this.langModal.emit();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.theme.emit();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getThemeIcon(): string {
    return this.currentTheme === 'light' ? '🌙' : '☀️';
  }
}
