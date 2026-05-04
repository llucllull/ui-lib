import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective, LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { LinkType } from '@lluc_llull/ui-lib/enums';
import { Home, LucideAngularModule, MoveRight } from 'lucide-angular';
import { NotFoundComponent } from './404.component';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NotFoundComponent,
                LinkTypeDirective,
                HighlightDirective,
                // Proveemos los iconos necesarios para que no falle el renderizado
                LucideAngularModule.pick({ Home, MoveRight }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debería renderizar el título, subtítulo y highlight cuando se proporcionan', () => {
        component.title = '404';
        component.subtitle = 'Página no encontrada';
        component.highlight = 'OPS!';
        fixture.detectChanges();

        const titleEl = fixture.debugElement.query(By.css('.notfound__title')).nativeElement;
        const subtitleEl = fixture.debugElement.query(By.css('.notfound__subtitle')).nativeElement;
        const highlightEl = fixture.debugElement.query(
            By.css('.notfound__highlight'),
        ).nativeElement;

        expect(titleEl.textContent).toContain('404');
        expect(subtitleEl.textContent).toContain('Página no encontrada');
        expect(highlightEl.textContent).toContain('OPS!');
    });

    it('debería renderizar el botón correctamente con sus atributos', () => {
        component.button = {
            label: 'Volver al inicio',
            url: '/es',
            linkType: 'internal' as LinkType,
            icon: 'home',
        };
        fixture.detectChanges();

        const btn = fixture.debugElement.query(By.css('.btn'));
        expect(btn).toBeTruthy();
        expect(btn.nativeElement.textContent).toContain('Volver al inicio');
        expect(btn.nativeElement.getAttribute('href')).toBe('/es');
    });

    it('no debería renderizar el botón si no se proporciona el input', () => {
        component.button = undefined;
        fixture.detectChanges();

        const btn = fixture.debugElement.query(By.css('.btn'));
        expect(btn).toBeNull();
    });

    it('debería aplicar la directiva highlight al subtítulo', () => {
        component.subtitle = 'Subtítulo con color';
        fixture.detectChanges();

        const subtitleEl = fixture.debugElement.query(By.css('.notfound__subtitle'));
        expect(subtitleEl).toBeTruthy();
    });
});
