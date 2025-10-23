import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { LinkType, LinkTypeDirective, SwiperDirective } from "../../../../directives";
import { UiIconComponent } from "../../../shared/ui-icon";
import { SocialFooterComponent } from "./social-footer.component";

describe('SocialFooterComponent', () => {
    let component: SocialFooterComponent;
    let fixture: ComponentFixture<SocialFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [SocialFooterComponent, LinkTypeDirective, SwiperDirective, UiIconComponent]
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
          { label: 'Facebook', url: 'https://facebook.com', linkType: LinkType.External, icon: 'facebook' },
          { label: 'Twitter', url: 'https://twitter.com', linkType: LinkType.External, icon: 'twitter' },
        ];
        fixture.detectChanges();
  
        const links = fixture.debugElement.queryAll(By.css('.social-footer__socials a'));
        expect(links.length).toBe(2);
        expect(links[0].nativeElement.getAttribute('href')).toBe('https://facebook.com');
        expect(links[0].nativeElement.getAttribute('aria-label')).toBe('Facebook');
        expect(links[1].nativeElement.getAttribute('href')).toBe('https://twitter.com');
      });
    });

    it('debería renderizar el hashtag si existe', () => {
      component.hashtag = '#Hashtag de prueba';
      fixture.detectChanges();
  
      const el = fixture.debugElement.query(By.css('span'))?.nativeElement;
      expect(el.textContent).toContain('#Hashtag de prueba');
    });

    
});