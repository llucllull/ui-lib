import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LinkType, LinkTypeDirective } from '../../../../../../directives';
import { SectionIntroComponent } from './section-intro.component';

describe('SectionIntroComponent', () => {
    let component: SectionIntroComponent;
    let fixture: ComponentFixture<SectionIntroComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SectionIntroComponent, LinkTypeDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(SectionIntroComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debería renderizar el pretitle si existe', () => {
        component.pretitle = 'Pre-título de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.pretitle'))?.nativeElement;
        expect(el.textContent).toContain('Pre-título de prueba');
    });

    it('debería renderizar el title si existe', () => {
        component.title = 'Título principal';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.title'))?.nativeElement;
        expect(el.textContent).toContain('Título principal');
    });

    it('debería renderizar el subtitle si existe', () => {
        component.subtitle = 'Subtítulo';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.subtitle'))?.nativeElement;
        expect(el.textContent).toContain('Subtítulo');
    });

    it('debería renderizar el text si existe', () => {
        component.text = 'Texto de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.text'))?.nativeElement;
        expect(el.textContent).toContain('Texto de prueba');
    });

    it('no debería renderizar el botón si no se pasa @Input button', () => {
        fixture.detectChanges();
        const btn = fixture.debugElement.query(By.css('.btn'));
        expect(btn).toBeNull();
    });

    it('debería renderizar el botón si se pasa @Input button', () => {
        component.button = { label: 'Click aquí', url: '/test', linkType: LinkType.Internal };
        fixture.detectChanges();

        const btn = fixture.debugElement.query(By.css('.btn'))?.nativeElement;
        expect(btn).toBeTruthy();
        expect(btn.textContent).toContain('Click aquí');
        expect(btn.getAttribute('href')).toBe('/test');
    });
});
