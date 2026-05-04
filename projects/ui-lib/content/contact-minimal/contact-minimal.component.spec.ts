import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactMinimalComponent } from './contact-minimal.component';

describe('ContactMinimalComponent', () => {
    let component: ContactMinimalComponent;
    let fixture: ComponentFixture<ContactMinimalComponent>;

    const mockContacts = [
        {
            label: 'Email',
            url: 'mailto:test@example.com',
            linkType: 'external',
        },
        {
            label: 'Teléfono',
            url: 'tel:+34123456789',
            linkType: 'external',
        },
    ];

    const mockSocials = [
        {
            label: 'Instagram',
            url: 'https://instagram.com/test',
            linkType: 'external',
        },
        {
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/test',
            linkType: 'external',
        },
    ];

    const mockImg = {
        url: '/assets/contact-image.jpg',
        alt: 'Imagen de contacto',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactMinimalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactMinimalComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render contacts title when contactsTitle is provided', () => {
        component.contactsTitle = 'Contacto';
        fixture.detectChanges();

        const titles = fixture.debugElement.queryAll(By.css('h2.subtitle'));
        expect(titles.length).toBe(1);
        expect(titles[0].nativeElement.textContent.trim()).toBe('Contacto');
    });

    it('should not render contacts title when contactsTitle is not provided', () => {
        component.contactsTitle = undefined;
        fixture.detectChanges();

        const titles = fixture.debugElement.queryAll(By.css('h2.subtitle'));
        expect(titles.length).toBe(0);
    });

    it('should render socials title when socialsTitle is provided', () => {
        component.socialsTitle = 'Síguenos';
        fixture.detectChanges();

        const titles = fixture.debugElement.queryAll(By.css('h2.subtitle'));
        expect(titles.length).toBe(1);
        expect(titles[0].nativeElement.textContent.trim()).toBe('Síguenos');
    });

    it('should render both titles when contactsTitle and socialsTitle are provided', () => {
        component.contactsTitle = 'Contacto';
        component.socialsTitle = 'Redes sociales';
        fixture.detectChanges();

        const titles = fixture.debugElement.queryAll(By.css('h2.subtitle'));
        expect(titles.length).toBe(2);
        expect(titles[0].nativeElement.textContent.trim()).toBe('Contacto');
        expect(titles[1].nativeElement.textContent.trim()).toBe('Redes sociales');
    });

    it('should render contact links when contacts are provided', () => {
        component.contacts = mockContacts as any;
        fixture.detectChanges();

        const leftSection = fixture.debugElement.query(
            By.css('.contact-minimal__content--left'),
        );
        const links = leftSection.queryAll(By.css('a.btn.btn-link'));

        expect(links.length).toBe(2);
        expect(links[0].nativeElement.textContent.trim()).toBe('Email');
        expect(links[0].nativeElement.getAttribute('href')).toBe('mailto:test@example.com');
        expect(links[1].nativeElement.textContent.trim()).toBe('Teléfono');
        expect(links[1].nativeElement.getAttribute('href')).toBe('tel:+34123456789');
    });

    it('should not render contact links when contacts is empty', () => {
        component.contacts = [];
        fixture.detectChanges();

        const leftSection = fixture.debugElement.query(
            By.css('.contact-minimal__content--left'),
        );
        const links = leftSection.queryAll(By.css('a.btn.btn-link'));

        expect(links.length).toBe(0);
    });

    it('should not render contact links when contacts is undefined', () => {
        component.contacts = undefined;
        fixture.detectChanges();

        const leftSection = fixture.debugElement.query(
            By.css('.contact-minimal__content--left'),
        );
        const links = leftSection.queryAll(By.css('a.btn.btn-link'));

        expect(links.length).toBe(0);
    });

    it('should render social links when socials are provided', () => {
        component.socials = mockSocials as any;
        fixture.detectChanges();

        const rightSection = fixture.debugElement.query(
            By.css('.contact-minimal__content--right'),
        );
        const links = rightSection.queryAll(By.css('a.btn.btn-link'));

        expect(links.length).toBe(2);
        expect(links[0].nativeElement.textContent.trim()).toBe('Instagram');
        expect(links[0].nativeElement.getAttribute('href')).toBe('https://instagram.com/test');
        expect(links[1].nativeElement.textContent.trim()).toBe('LinkedIn');
        expect(links[1].nativeElement.getAttribute('href')).toBe('https://linkedin.com/in/test');
    });

    it('should not render social links when socials is empty', () => {
        component.socials = [];
        fixture.detectChanges();

        const rightSection = fixture.debugElement.query(
            By.css('.contact-minimal__content--right'),
        );
        const links = rightSection.queryAll(By.css('a.btn.btn-link'));

        expect(links.length).toBe(0);
    });

    it('should render image when img is provided', () => {
        component.img = mockImg as any;
        fixture.detectChanges();

        const imgEl = fixture.debugElement.query(
            By.css('.contact-minimal__content--media img'),
        );

        expect(imgEl).toBeTruthy();
        expect(imgEl.nativeElement.getAttribute('src')).toBe('/assets/contact-image.jpg');
        expect(imgEl.nativeElement.getAttribute('alt')).toBe('Imagen de contacto');
    });

    it('should not render image when img is not provided', () => {
        component.img = undefined;
        fixture.detectChanges();

        const imgEl = fixture.debugElement.query(
            By.css('.contact-minimal__content--media img'),
        );

        expect(imgEl).toBeNull();
    });

    it('should render full component content correctly', () => {
        component.contactsTitle = 'Contacto';
        component.socialsTitle = 'Síguenos';
        component.contacts = mockContacts as any;
        component.socials = mockSocials as any;
        component.img = mockImg as any;

        fixture.detectChanges();

        const titles = fixture.debugElement.queryAll(By.css('h2.subtitle'));
        const links = fixture.debugElement.queryAll(By.css('a.btn.btn-link'));
        const imgEl = fixture.debugElement.query(By.css('img'));

        expect(titles.length).toBe(2);
        expect(links.length).toBe(4);
        expect(imgEl).toBeTruthy();
    });
});