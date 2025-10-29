import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LinkType, LinkTypeDirective } from '../../../../directives/link-type.directive';
import { NavModalComponent } from './nav-modal.component';

describe('NavModalComponent', () => {
    let component: NavModalComponent;
    let fixture: ComponentFixture<NavModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavModalComponent, LinkTypeDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(NavModalComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    describe('navItems input', () => {
        it('no debería renderizar links si no se pasa navItems', () => {
            fixture.detectChanges();
            const navLinks = fixture.debugElement.queryAll(By.css('ol a'));
            expect(navLinks.length).toBe(0);
        });

        it('debería renderizar tantos links como se pasen en navItems', () => {
            component.navItems = [
                { label: 'Home', url: '/home', linkType: LinkType.Internal },
                { label: 'About', url: '/about', linkType: LinkType.Internal },
            ];
            fixture.detectChanges();

            const navLinks = fixture.debugElement.queryAll(By.css('ol a'));
            expect(navLinks.length).toBe(2);
            expect(navLinks[0].nativeElement.getAttribute('href')).toBe('/home');
            expect(navLinks[1].nativeElement.getAttribute('href')).toBe('/about');
        });
    });

    describe('socialItems input', () => {
        it('no debería renderizar sociales si no se pasa socialItems', () => {
            fixture.detectChanges();
            const socialLinks = fixture.debugElement.queryAll(By.css('.buttons a'));
            expect(socialLinks.length).toBe(0);
        });

        it('debería renderizar tantos sociales como se pasen en socialItems', () => {
            component.socialItems = [
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

            const socialLinks = fixture.debugElement.queryAll(By.css('.buttons a'));
            expect(socialLinks.length).toBe(2);
            expect(socialLinks[0].nativeElement.getAttribute('href')).toBe('https://facebook.com');
            expect(socialLinks[1].nativeElement.getAttribute('href')).toBe('https://twitter.com');
        });
    });

    describe('close output', () => {
        it('debería emitir close al hacer click en el botón de cerrar', () => {
            spyOn(component.close, 'emit');
            fixture.detectChanges();

            const btn = fixture.debugElement.query(By.css('.close-btn')).nativeElement;
            btn.click();

            expect(component.close.emit).toHaveBeenCalled();
        });

        it('debería emitir close al hacer click en un navItem', () => {
            spyOn(component.close, 'emit');
            component.navItems = [{ label: 'Home', url: '/home', linkType: LinkType.Internal }];
            fixture.detectChanges();

            const navLink = fixture.debugElement.query(By.css('ol a')).nativeElement;
            navLink.click();

            expect(component.close.emit).toHaveBeenCalled();
        });
    });
});
