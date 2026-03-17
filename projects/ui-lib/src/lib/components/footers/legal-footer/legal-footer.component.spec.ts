import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LinkType, LinkTypeDirective } from '@lluc_llull/ui-lib';
import { LegalFooterComponent } from './legal-footer.component';

describe('LegalFooterComponent', () => {
    let component: LegalFooterComponent;
    let fixture: ComponentFixture<LegalFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LegalFooterComponent, LinkTypeDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(LegalFooterComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    describe('links input', () => {
        it('no debería renderizar links si no se pasa @Input links', () => {
            fixture.detectChanges();
            const links = fixture.debugElement.queryAll(By.css('a'));
            expect(links.length).toBe(0);
        });

        it('debería renderizar tantos links como se pasen en @Input links', () => {
            component.variant = 'extended';
            component.links = [
                {
                    label: 'Facebook',
                    url: 'https://facebook.com',
                    linkType: LinkType.External,
                    icon: 'facebook',
                },
                {
                    label: 'Twitter',
                    url: 'https://twitter.com',
                    linkType: LinkType.External,
                    icon: 'twitter',
                },
            ];
            fixture.detectChanges();

            const links = fixture.debugElement.queryAll(By.css('a'));
            expect(links.length).toBe(2);
            expect(links[0].nativeElement.getAttribute('href')).toBe('https://facebook.com');
            expect(links[1].nativeElement.getAttribute('href')).toBe('https://twitter.com');
        });
    });

    it('debería renderizar el año si existe', () => {
        component.year = 2025;
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.legal-footer__simple-brand'))?.nativeElement;
        expect(el.textContent).toContain('2025');
        expect(component.year).toBe(2025);
    });

    it('debería renderizar el brand si existe', () => {
        component.brand = 'Brand de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.legal-footer__simple-brand'))?.nativeElement;
        expect(el.textContent).toContain('Brand de prueba');
    });

    it('debería renderizar el credits si existe', () => {
        component.credits = 'Credits de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(
            By.css('.legal-footer__simple-credits'),
        )?.nativeElement;
        expect(el.textContent).toContain('Credits de prueba');
    });

    describe('variant input', () => {
        it('debería renderizar la variante simple por defecto', () => {
            fixture.detectChanges();

            const simpleEl = fixture.debugElement.query(By.css('.legal-footer__simple'));
            const extendedEl = fixture.debugElement.query(By.css('.legal-footer__extended'));

            expect(simpleEl).toBeTruthy(); // existe
            expect(extendedEl).toBeNull(); // no existe
        });

        it('debería renderizar la variante extended si se pasa @Input variant="extended"', () => {
            component.variant = 'extended';
            fixture.detectChanges();

            const simpleEl = fixture.debugElement.query(By.css('.legal-footer__simple'));
            const extendedEl = fixture.debugElement.query(By.css('.legal-footer__extended'));

            expect(simpleEl).toBeNull(); // ya no debería existir
            expect(extendedEl).toBeTruthy(); // ahora sí existe
        });
    });
});
