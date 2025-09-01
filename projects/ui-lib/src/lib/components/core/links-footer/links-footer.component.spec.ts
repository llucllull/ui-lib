import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { LinkType, LinkTypeDirective, SwiperDirective } from "../../../directives";
import { UiIconComponent } from "../../shared/ui-icon";
import { LinksFooterComponent } from "./links-footer.component";

describe('LinksFooterComponent', () => {
    let component: LinksFooterComponent;
    let fixture: ComponentFixture<LinksFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [LinksFooterComponent, LinkTypeDirective, SwiperDirective, UiIconComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(LinksFooterComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
      expect(component).toBeTruthy();
    });

    describe('links input', () => {
      it('no debería renderizar links si no se pasa @Input links', () => {
        fixture.detectChanges();
        const links = fixture.debugElement.queryAll(By.css('.btn'));
        expect(links.length).toBe(0);
      });
  
      it('debería renderizar tantos links como se pasen en @Input links', () => {
        component.links = [
          { label: 'Facebook', url: 'https://facebook.com', linkType: LinkType.External, icon: 'facebook' },
          { label: 'Twitter', url: 'https://twitter.com', linkType: LinkType.External, icon: 'twitter' },
        ];
        fixture.detectChanges();
  
        const links = fixture.debugElement.queryAll(By.css('.btn'));
        expect(links.length).toBe(2);
        expect(links[0].nativeElement.getAttribute('href')).toBe('https://facebook.com');
        expect(links[1].nativeElement.getAttribute('href')).toBe('https://twitter.com');
      });
    });
    
});