import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LinkType, LinkTypeDirective } from '../../../../directives';
import { VisualFooterComponent } from './visual-footer.component';

describe('VisualFooterComponent', () => {
    let component: VisualFooterComponent;
    let fixture: ComponentFixture<VisualFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VisualFooterComponent, LinkTypeDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(VisualFooterComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debería renderizar el contactTitle si existe', () => {
        component.contactTitle = 'Contacto';
        fixture.detectChanges();

        const el = fixture.debugElement.query(
            By.css('.visual-footer__contact .title'),
        ).nativeElement;
        expect(el.textContent).toContain('Contacto');
    });

    it('debería renderizar el contactPhone si existe', () => {
        component.contactPhone = {
            label: 'Llámanos',
            url: 'tel:+34123456789',
            linkType: LinkType.External,
        } as any;
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.visual-footer__contact a')).nativeElement;
        expect(el.getAttribute('href')).toBe('tel:+34123456789');
        expect(el.textContent).toContain('Llámanos');
    });

    it('debería renderizar el contactEmail si existe', () => {
        component.contactEmail = {
            label: 'Escríbenos',
            url: 'mailto:test@mail.com',
            linkType: LinkType.External,
        } as any;
        fixture.detectChanges();

        const el = fixture.debugElement.queryAll(By.css('.visual-footer__contact a'))[0]
            .nativeElement;
        expect(el.getAttribute('href')).toBe('mailto:test@mail.com');
        expect(el.textContent).toContain('Escríbenos');
    });

    it('debería renderizar el addressTitle si existe', () => {
        component.addressTitle = 'Dirección';
        fixture.detectChanges();

        const el = fixture.debugElement.query(
            By.css('.visual-footer__address .title'),
        ).nativeElement;
        expect(el.textContent).toContain('Dirección');
    });

    it('debería renderizar la dirección si existe', () => {
        component.address = {
            address: 'Calle Falsa 123',
            cp: '08080',
            city: 'Barcelona',
            province: 'Barcelona',
            country: 'España',
        };
        fixture.detectChanges();

        const text = fixture.debugElement.query(By.css('.visual-footer__address .text'))
            .nativeElement.textContent;
        expect(text).toContain('Calle Falsa 123');
        expect(text).toContain('08080 Barcelona');
        expect(text).toContain('Barcelona España');
    });

    it('debería renderizar el socialsTitle y los socials si existen', () => {
        component.socialsTitle = 'Síguenos';
        component.socials = [
            { label: 'Facebook', url: 'https://facebook.com', linkType: LinkType.External } as any,
            { label: 'Twitter', url: 'https://twitter.com', linkType: LinkType.External } as any,
        ];
        fixture.detectChanges();

        const title = fixture.debugElement.query(
            By.css('.visual-footer__socials .title'),
        ).nativeElement;
        expect(title.textContent).toContain('Síguenos');

        const socials = fixture.debugElement.queryAll(By.css('.visual-footer__socials a'));
        expect(socials.length).toBe(2);
        expect(socials[0].nativeElement.getAttribute('href')).toBe('https://facebook.com');
        expect(socials[1].nativeElement.getAttribute('href')).toBe('https://twitter.com');
    });

    it('debería renderizar la imagen si existe', () => {
        component.image = { url: '/test.jpg', alt: 'Imagen test' } as any;
        fixture.detectChanges();

        const img = fixture.debugElement.query(By.css('.visual-footer__image img')).nativeElement;
        expect(img.getAttribute('src')).toBe('/test.jpg');
        expect(img.getAttribute('alt')).toBe('Imagen test');
    });
});
