import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import {
    UiLibButtonI,
    UiLibImageI,
    UiLibNavItemsI,
    UiLibSocialItemsI,
} from '@lluc_llull/ui-lib/interfaces';
import { Subscription } from 'rxjs';
import { Theme, ThemeService } from '@lluc_llull/ui-lib/theme';
import { mapNavModal } from '../../../../services/mapper/component-mappers/nav-modal.mapper';
import { LangModalComponent, NavModalComponent } from '../../modals';

@Component({
    selector: 'lib-header-clear',
    standalone: true,
    imports: [CommonModule, LangModalComponent, NavModalComponent, LinkTypeDirective],
    templateUrl: './header-clear.component.html',
    styleUrl: './header-clear.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderClearComponent implements OnInit, OnDestroy, OnChanges {
    isMenuOpen = false;
    currentTheme: Theme = 'light';
    private themeSubscription?: Subscription;

    @Input() logo?: UiLibImageI;
    @Input() logoDark?: UiLibImageI;
    @Input() navItems?: UiLibNavItemsI[];
    @Input() socialItems?: UiLibSocialItemsI[];
    @Input() homeLink?: UiLibButtonI;
    @Input() navigation: any;
    @Input() lang: string = 'es';

    @Output() langModal = new EventEmitter<void>();
    @Output() theme = new EventEmitter<void>();

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.themeSubscription = this.themeService.currentTheme$.subscribe((theme) => {
            this.currentTheme = theme;
        });
    }

    ngOnChanges() {
        this.navItems = mapNavModal(this.navigation, this.lang);
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
