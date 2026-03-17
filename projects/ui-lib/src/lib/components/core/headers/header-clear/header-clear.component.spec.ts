import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LinkTypeDirective } from '../../../../../../directives';
import { ThemeService } from '../../../../../../theme';
import { HeaderClearComponent } from './header-clear.component';

describe('HeaderClearComponent', () => {
    let component: HeaderClearComponent;
    let fixture: ComponentFixture<HeaderClearComponent>;
    let themeServiceSpy: jasmine.SpyObj<ThemeService>;

    beforeEach(async () => {
        themeServiceSpy = jasmine.createSpyObj('ThemeService', ['toggleTheme'], {
            currentTheme$: of('light'),
        });

        await TestBed.configureTestingModule({
            imports: [HeaderClearComponent, LinkTypeDirective],
            providers: [{ provide: ThemeService, useValue: themeServiceSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderClearComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debería renderizar el logo light por defecto', () => {
        component.logo = { url: '/logo-light.png', alt: 'Logo Light' };
        component.logoDark = { url: '/logo-dark.png', alt: 'Logo Dark' };
        fixture.detectChanges();

        const img = fixture.debugElement.query(By.css('.header-logo img')).nativeElement;
        expect(img.getAttribute('src')).toBe('/logo-light.png');
        expect(img.getAttribute('alt')).toBe('Logo Light');
    });

    it('debería mostrar el idioma en el botón', () => {
        component.lang = 'EN';
        fixture.detectChanges();

        const langEl = fixture.debugElement.query(By.css('.lang')).nativeElement;
        expect(langEl.textContent).toBe('EN');
    });

    it('debería emitir langModal al hacer click en el botón de idioma', () => {
        spyOn(component.langModal, 'emit');
        fixture.detectChanges();

        const btn = fixture.debugElement.queryAll(By.css('.btn'))[0].nativeElement; // primer botón (idioma)
        btn.click();

        expect(component.langModal.emit).toHaveBeenCalled();
    });

    it('debería llamar a ThemeService.toggleTheme y emitir al hacer click en el botón de tema', () => {
        spyOn(component.theme, 'emit');
        fixture.detectChanges();

        const btn = fixture.debugElement.queryAll(By.css('.btn'))[1].nativeElement; // segundo botón (tema)
        btn.click();

        expect(themeServiceSpy.toggleTheme).toHaveBeenCalled();
        expect(component.theme.emit).toHaveBeenCalled();
    });

    it('debería alternar isMenuOpen al hacer click en el botón de menú', () => {
        fixture.detectChanges();

        const btn = fixture.debugElement.queryAll(By.css('.btn'))[2].nativeElement; // tercer botón (menú)
        btn.click();
        expect(component.isMenuOpen).toBeTrue();

        btn.click();
        expect(component.isMenuOpen).toBeFalse();
    });

    it('debería devolver 🌙 si el tema es light', () => {
        component.currentTheme = 'light';
        expect(component.getThemeIcon()).toBe('🌙');
    });

    it('debería devolver ☀️ si el tema es dark', () => {
        component.currentTheme = 'dark';
        expect(component.getThemeIcon()).toBe('☀️');
    });
});
