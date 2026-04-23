import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { MediaSplitComponent } from './media-split.component';

describe('MediaSplitComponent', () => {
    let component: MediaSplitComponent;
    let fixture: ComponentFixture<MediaSplitComponent>;

    const mockImages: UiLibImageI[] = [
        {
            url: '/images/test1.png',
            alt: 'Test 1',
        },
        {
            url: '/images/test2.png',
            alt: 'Test 2',
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MediaSplitComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MediaSplitComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('inputs', () => {
        it('should render title when provided', () => {
            fixture.componentRef.setInput('title', 'About me');
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('h1, h2, .title');
            expect(el?.textContent?.trim()).toContain('About me');
        });

        it('should render text when provided', () => {
            fixture.componentRef.setInput('text', 'Some description');
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('p, .text');
            expect(el?.textContent?.trim()).toContain('Some description');
        });

        it('should render images when provided', () => {
            fixture.componentRef.setInput('images', mockImages);
            fixture.detectChanges();

            const imgs = fixture.nativeElement.querySelectorAll('img');
            expect(imgs.length).toBe(2);
        });
    });

    describe('activeImageIndex signal', () => {
        it('should start at 0', () => {
            expect(component.activeImageIndex()).toBe(0);
        });

        it('should update active image index', () => {
            component.updateActiveImage(1);
            expect(component.activeImageIndex()).toBe(1);
        });

        it('should reset image index to 0', () => {
            component.updateActiveImage(1);
            component.resetImage();

            expect(component.activeImageIndex()).toBe(0);
        });
    });

    describe('template interaction', () => {
        it('should update active image on mouseenter', () => {
            fixture.componentRef.setInput('images', mockImages);
            fixture.detectChanges();

            const zones = fixture.nativeElement.querySelectorAll('.hover-zone');

            zones[1].dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();

            expect(component.activeImageIndex()).toBe(1);
        });

        it('should reset active image on mouseleave', () => {
            fixture.componentRef.setInput('images', mockImages);
            fixture.detectChanges();

            component.updateActiveImage(1);

            const container = fixture.nativeElement.querySelector('.image-stack');

            container.dispatchEvent(new Event('mouseleave'));
            fixture.detectChanges();

            expect(component.activeImageIndex()).toBe(0);
        });
    });
});
