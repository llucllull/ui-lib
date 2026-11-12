import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { LinkType } from '@lluc_llull/ui-lib/enums';
import { HeaderMobileComponent } from './header-mobile.component';
import { ThemeService } from '@lluc_llull/ui-lib/theme';
import { LucideAngularModule, Sun, Moon, Menu, X } from 'lucide-angular'; 
import type { Mock } from 'vitest';

describe('HeaderMobileComponent', () => {
    let component: HeaderMobileComponent;
    let fixture: ComponentFixture<HeaderMobileComponent>;
    let themeServiceSpy: Omit<Partial<ThemeService>, 'toggleTheme'> & { toggleTheme: Mock<() => void> };

    beforeEach(async () => {
        themeServiceSpy = {
            toggleTheme: vi.fn(),
            currentTheme$: of('light'),
        };

        await TestBed.configureTestingModule({
            imports: [
                HeaderMobileComponent, 
                LinkTypeDirective,
                LucideAngularModule.pick({ Sun, Moon, Menu, X }) 
            ],
            providers: [{ provide: ThemeService, useValue: themeServiceSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderMobileComponent);
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
        component.lang = 'ES';
        fixture.detectChanges();

        const langEl = fixture.debugElement.query(By.css('.lang')).nativeElement;
        expect(langEl.textContent).toBe('ES');
    });

    it('debería emitir langModal al hacer click en el botón de idioma', () => {
        vi.spyOn(component.langModal, 'emit');
        fixture.detectChanges();

        const btn = fixture.debugElement.query(By.css('.left .btn')).nativeElement;
        btn.click();

        expect(component.langModal.emit).toHaveBeenCalled();
    });

    it('debería alternar isMenuOpen al hacer click en el botón de menú', () => {
        fixture.detectChanges();

        const btn = fixture.debugElement.query(By.css('.right .btn')).nativeElement;
        btn.click();
        expect(component.isMenuOpen).toBe(true);

        btn.click();
        expect(component.isMenuOpen).toBe(false);
    });

    it('debería mapear navigation en navItems según lang', () => {
        component.navigation = {
            items: [
                { slug: 'home', label: { es: 'Inicio' } },
                { slug: 'about', label: { en: 'About' } },
            ],
        };
        component.lang = 'en';
        component.ngOnChanges();

        expect(component.navItems?.length).toBe(2);
        expect(component.navItems?.[0].url).toBe('/en');
        expect(component.navItems?.[0].label).toBe('Inicio');
        expect(component.navItems?.[1].url).toBe('/en/about');
        expect(component.navItems?.[1].label).toBe('About');
    });

    it('debería devolver navItems vacíos si no hay navigation', () => {
        component.ngOnChanges();

        expect(component.navItems).toEqual([]);
    });

    it('debería alternar el tema y emitir theme al llamar toggleTheme', () => {
        vi.spyOn(component.theme, 'emit');

        component.toggleTheme();

        expect(themeServiceSpy.toggleTheme).toHaveBeenCalled();
        expect(component.theme.emit).toHaveBeenCalled();
    });

    it('no debería hacer nada al cerrar el menú si no está abierto', () => {
        component.closeMenu();

        expect(component.isMenuOpen).toBe(false);
        expect(component.isMenuClosing).toBe(false);
    });

    it('debería finalizar el cierre al terminar la transición de visibility', () => {
        component.toggleMenu();
        component.toggleMenu();
        const target = document.createElement('div');
        target.classList.add('modal-content');

        component.finishMenuClose({ propertyName: 'visibility', target } as unknown as TransitionEvent);

        expect(component.isMenuClosing).toBe(false);
    });

    it('no debería finalizar el cierre si el menú no se está cerrando', () => {
        const target = document.createElement('div');
        target.classList.add('modal-content');

        component.finishMenuClose({ propertyName: 'visibility', target } as unknown as TransitionEvent);

        expect(component.isMenuClosing).toBe(false);
    });

    it('no debería finalizar el cierre en transiciones ajenas al modal', () => {
        component.toggleMenu();
        component.toggleMenu();
        const target = document.createElement('div');
        target.classList.add('modal-content');

        component.finishMenuClose({ propertyName: 'opacity', target } as unknown as TransitionEvent);
        component.finishMenuClose({ propertyName: 'visibility', target: document.createTextNode('x') } as unknown as TransitionEvent);
        component.finishMenuClose({ propertyName: 'visibility', target: document.createElement('span') } as unknown as TransitionEvent);

        expect(component.isMenuClosing).toBe(true);
    });

    it('debería renderizar el nav modal al abrir el menú con navItems', () => {
        component.navigation = { items: [{ slug: 'home', label: { es: 'Inicio' } }] };
        component.lang = 'es';
        component.ngOnChanges();
        component.socialItems = [
            { label: 'GitHub', url: 'https://github.com', linkType: LinkType.External, icon: 'github' },
        ];
        component.toggleMenu();
        fixture.detectChanges();

        const modal = fixture.debugElement.query(By.css('lib-nav-modal'));
        expect(modal).toBeTruthy();
        expect(modal.componentInstance.closing).toBe(false);

        const navLinks = fixture.debugElement.queryAll(By.css('ol a'));
        expect(navLinks.length).toBe(1);
        expect(navLinks[0].nativeElement.getAttribute('href')).toBe('/es');
        expect(fixture.debugElement.queryAll(By.css('.btn-group a')).length).toBe(1);
    });

    it('debería cerrar el nav modal y finalizar la transición', () => {
        component.navigation = { items: [{ slug: 'home', label: { es: 'Inicio' } }] };
        component.lang = 'es';
        component.ngOnChanges();
        component.toggleMenu();
        fixture.detectChanges();

        fixture.debugElement.query(By.css('lib-nav-modal .close-btn')).nativeElement.click();
        fixture.detectChanges();

        expect(component.isMenuOpen).toBe(false);
        expect(component.isMenuClosing).toBe(true);
        expect(fixture.debugElement.query(By.css('lib-nav-modal'))).toBeTruthy();

        const event = new Event('transitionend', { bubbles: true }) as TransitionEvent;
        Object.defineProperty(event, 'propertyName', { value: 'visibility' });
        fixture.debugElement.query(By.css('.modal-content')).nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(component.isMenuClosing).toBe(false);
        expect(fixture.debugElement.query(By.css('lib-nav-modal'))).toBeNull();
    });
});
