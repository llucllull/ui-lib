import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LucideAngularModule, MoveRight } from 'lucide-angular';
import { LinkType, LinkTypeDirective } from '../../directives';
import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
    let component: HeroSectionComponent;
    let fixture: ComponentFixture<HeroSectionComponent>;
    let documentMock: Document;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HeroSectionComponent,
                LinkTypeDirective,
                LucideAngularModule.pick({ MoveRight }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroSectionComponent);
        component = fixture.componentInstance;
        documentMock = TestBed.inject(DOCUMENT);
    });

    afterEach(() => {
        documentMock.body.classList.remove('has-hero-image');
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    /* =========================
       BUTTONS
    ========================= */
    describe('buttons input', () => {
        it('no debería renderizar buttons si no se pasa @Input buttons', () => {
            fixture.detectChanges();
            const buttons = fixture.debugElement.queryAll(By.css('.btn'));
            expect(buttons.length).toBe(0);
        });

        it('debería renderizar tantos buttons como se pasen en @Input buttons', () => {
            component.buttons = [
                {
                    label: 'Facebook',
                    url: 'https://facebook.com',
                    linkType: LinkType.External,
                    icon: 'move-right',
                },
                {
                    label: 'Twitter',
                    url: 'https://twitter.com',
                    linkType: LinkType.External,
                    icon: 'move-right',
                },
            ];
            fixture.detectChanges();

            const buttons = fixture.debugElement.queryAll(By.css('.btn'));
            expect(buttons.length).toBe(2);
            expect(buttons[0].nativeElement.getAttribute('href')).toBe('https://facebook.com');
            expect(buttons[1].nativeElement.getAttribute('href')).toBe('https://twitter.com');
        });
    });

    /* =========================
       TEXT CONTENT
    ========================= */
    it('debería renderizar el pretitle si existe', () => {
        component.pretitle = 'pretitle de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.pretitle'))?.nativeElement;
        expect(el.textContent).toContain('pretitle de prueba');
    });

    it('debería renderizar el title si existe', () => {
        component.title = 'title de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.title'))?.nativeElement;
        expect(el.textContent).toContain('title de prueba');
    });

    it('debería renderizar el subtitle si existe', () => {
        component.subtitle = 'subtitle de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.subtitle'))?.nativeElement;
        expect(el.textContent).toContain('subtitle de prueba');
    });

    it('debería renderizar el text si existe', () => {
        component.text = 'text de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.text'))?.nativeElement;
        expect(el.textContent).toContain('text de prueba');
    });

    /* =========================
       HIGHLIGHT
    ========================= */
    it('debería renderizar el highlight dentro del title si coincide', () => {
        component.title = 'Este es un highlight de prueba';
        component.highlight = 'highlight de prueba';
        fixture.detectChanges();

        const highlightEl = fixture.debugElement.query(By.css('.highlight-text'))?.nativeElement;
        expect(highlightEl).toBeTruthy();
        expect(highlightEl.textContent).toContain('highlight de prueba');
    });

    it('no debería renderizar el highlight si no está incluido en el title', () => {
        component.title = 'Un título cualquiera';
        component.highlight = 'texto que no existe';
        fixture.detectChanges();

        const highlightEl = fixture.debugElement.query(By.css('.highlight-text'));
        expect(highlightEl).toBeNull();
    });

    /* =========================
       VARIANT IMAGE (DOM SIDE EFFECTS)
    ========================= */
    describe('variant image behavior', () => {
        it('debería añadir la clase al body cuando variant es image', () => {
            component.variant = 'image';

            fixture.detectChanges(); // ngOnInit

            expect(documentMock.body.classList.contains('has-hero-image')).toBeTrue();
        });

        it('no debería añadir la clase si variant es text', () => {
            component.variant = 'text';

            fixture.detectChanges();

            expect(documentMock.body.classList.contains('has-hero-image')).toBeFalse();
        });

        it('debería eliminar la clase al destruir el componente', () => {
            component.variant = 'image';
            fixture.detectChanges();

            fixture.destroy(); // ngOnDestroy

            expect(documentMock.body.classList.contains('has-hero-image')).toBeFalse();
        });
    });

    /* =========================
       IMAGE RENDER
    ========================= */
    it('debería renderizar la imagen cuando variant es image', () => {
        component.variant = 'image';
        component.image = {
            url: '/test.jpg',
            alt: 'test',
        };

        fixture.detectChanges();

        const img = fixture.debugElement.query(By.css('img'));
        expect(img).toBeTruthy();
        expect(img.nativeElement.getAttribute('src')).toBe('/test.jpg');
    });
});
