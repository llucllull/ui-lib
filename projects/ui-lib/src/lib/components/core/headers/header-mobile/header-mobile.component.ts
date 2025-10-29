import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LinkTypeDirective } from '../../../../directives/link-type.directive';
import { UiLibButtonI } from '../../../../interfaces/ui-lib-button.interface';
import { UiLibImageI } from '../../../../interfaces/ui-lib-image.interface';
import {
    UiLibNavItemsI,
    UiLibSocialItemsI,
} from '../../../../interfaces/ui-lib-nav-items.interface';
import { Theme, ThemeService } from '../../../../services/theme';
import { LangModalComponent, NavModalComponent } from '../../modals';

@Component({
    selector: 'lib-header-mobile',
    standalone: true,
    imports: [CommonModule, LangModalComponent, NavModalComponent, LinkTypeDirective],
    templateUrl: './header-mobile.component.html',
    styleUrl: './header-mobile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMobileComponent implements OnInit, OnDestroy {
    isMenuOpen = false;
    currentTheme: Theme = 'light';
    private themeSubscription?: Subscription;

    @Input() logo?: UiLibImageI;
    @Input() logoDark?: UiLibImageI;
    @Input() lang?: string;
    @Input() navItems?: UiLibNavItemsI[];
    @Input() socialItems?: UiLibSocialItemsI[];
    @Input() homeLink?: UiLibButtonI;

    @Output() langModal = new EventEmitter<void>();
    @Output() theme = new EventEmitter<void>();

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.themeSubscription = this.themeService.currentTheme$.subscribe((theme) => {
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
