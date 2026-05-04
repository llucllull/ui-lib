import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { ThemeService } from '@lluc_llull/ui-lib/theme';
import { HeaderClearComponent } from './header-clear.component';
import { LucideAngularModule, Sun, Moon, Menu } from 'lucide-angular';

describe('HeaderClearComponent', () => {
    let component: HeaderClearComponent;
    let fixture: ComponentFixture<HeaderClearComponent>;
    let themeServiceSpy: jasmine.SpyObj<ThemeService>;

    beforeEach(async () => {
        themeServiceSpy = jasmine.createSpyObj('ThemeService', ['toggleTheme'], {
            currentTheme$: of('light'),
        });

        await TestBed.configureTestingModule({
            imports: [
                HeaderClearComponent, 
                LinkTypeDirective,
                LucideAngularModule.pick({ Sun, Moon, Menu })
            ],
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
});
