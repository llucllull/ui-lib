import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LinkTypeDirective } from '@lluc_llull/ui-lib/directives';
import { LinkType } from '@lluc_llull/ui-lib/enums';
import { SwiperDirective } from '@lluc_llull/ui-lib/sliders';
import { SocialFooterComponent } from './social-footer.component';

describe('SocialFooterComponent', () => {
    let component: SocialFooterComponent;
    let fixture: ComponentFixture<SocialFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SocialFooterComponent, LinkTypeDirective, SwiperDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(SocialFooterComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    describe('images input', () => {
        it('no debería renderizar imágenes si no se pasa @Input images', () => {
            fixture.detectChanges();
            const slides = fixture.debugElement.queryAll(By.css('.swiper-slide'));
            expect(slides.length).toBe(0);
        });

        it('debería renderizar tantas imágenes como se pasen en @Input images', () => {
            component.images = [
                { url: '/img1.jpg', alt: 'Imagen 1' },
                { url: '/img2.jpg', alt: 'Imagen 2' },
            ];
            fixture.detectChanges();

            const slides = fixture.debugElement.queryAll(By.css('.swiper-slide img'));
            expect(slides.length).toBe(2);
            expect(slides[0].nativeElement.getAttribute('src')).toBe('/img1.jpg');
            expect(slides[0].nativeElement.getAttribute('alt')).toBe('Imagen 1');
            expect(slides[1].nativeElement.getAttribute('src')).toBe('/img2.jpg');
        });
    });

    describe('socials input', () => {
        it('no debería renderizar enlaces sociales si no se pasa @Input socials', () => {
            fixture.detectChanges();
            const links = fixture.debugElement.queryAll(By.css('.social-footer__socials a'));
            expect(links.length).toBe(0);
        });

        it('debería renderizar tantos enlaces sociales como se pasen en @Input socials', () => {
            component.socials = [
                {
                    label: 'Mail',
                    url: 'https://facebook.com',
                    linkType: LinkType.External,
                    icon: 'mail',
                },
                {
                    label: 'LinkedIn',
                    url: 'https://linkedin.com',
                    linkType: LinkType.External,
                    icon: 'linkedin',
                },
            ];
            fixture.detectChanges();

            const links = fixture.debugElement.queryAll(By.css('.social-footer__socials a'));
            expect(links.length).toBe(2);
            expect(links[0].nativeElement.getAttribute('href')).toBe('https://facebook.com');
            expect(links[0].nativeElement.getAttribute('aria-label')).toBe('Mail');
            expect(links[1].nativeElement.getAttribute('href')).toBe('https://linkedin.com');
        });

        it('debería renderizar el enlace sin icono cuando el social no tiene icon', () => {
            component.socials = [
                { label: 'Sin icono', url: 'https://example.com', linkType: LinkType.External } as any,
            ];
            fixture.detectChanges();

            const link = fixture.debugElement.query(By.css('.social-footer__socials a'))?.nativeElement;
            expect(link).toBeTruthy();
            expect(link.querySelector('ui-icon')).toBeNull();
        });

        it('debería usar un alt vacío cuando la imagen no tiene alt', () => {
            component.images = [{ url: '/img3.jpg' } as any];
            fixture.detectChanges();

            const img = fixture.debugElement.query(By.css('.swiper-slide img'))?.nativeElement;
            expect(img.getAttribute('alt')).toBe('');
        });
    });

    it('debería renderizar el hashtag si existe', () => {
        component.hashtag = '#Hashtag de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('span'))?.nativeElement;
        expect(el.textContent).toContain('#Hashtag de prueba');
    });
});
