import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
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
});
