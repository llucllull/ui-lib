import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CLOUDINARY_CLOUD_NAME } from '@lluc_llull/ui-lib/mapper';
import { TextMosaicHeroComponent } from './text-mosaic-hero.component';

class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();

    private callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    trigger(isIntersecting: boolean): void {
        this.callback(
            [{ isIntersecting } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
        );
    }
}

describe('TextMosaicHeroComponent', () => {
    let component: TextMosaicHeroComponent;
    let fixture: ComponentFixture<TextMosaicHeroComponent>;

    const mediaState = { reduced: false };
    const originalMatchMedia = window.matchMedia;

    beforeEach(async () => {
        mediaState.reduced = false;

        (window as any).IntersectionObserver = MockIntersectionObserver;
        (window as any).matchMedia = (query: string) => ({
            matches: query.includes('prefers-reduced-motion') && mediaState.reduced,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        });

        await TestBed.configureTestingModule({
            imports: [TextMosaicHeroComponent],
            providers: [
                { provide: PLATFORM_ID, useValue: 'browser' },
                { provide: CLOUDINARY_CLOUD_NAME, useValue: 'demo' },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TextMosaicHeroComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        (window as any).matchMedia = originalMatchMedia;
        vi.unstubAllGlobals();
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('content', () => {
        it('should render the default title', () => {
            fixture.detectChanges();

            const title = fixture.nativeElement.querySelector('.text-mosaic__title');
            expect(title?.textContent.trim()).toBe('WHO DAAT BOY');
        });

        it('should render a custom title', () => {
            fixture.componentRef.setInput('title', 'CUSTOM TITLE');
            fixture.detectChanges();

            const title = fixture.nativeElement.querySelector('.text-mosaic__title');
            expect(title?.textContent.trim()).toBe('CUSTOM TITLE');
        });

        it('should not render the title when it is empty', () => {
            fixture.componentRef.setInput('title', '');
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.text-mosaic__title')).toBeNull();
        });

        it('should expose an empty image list by default', () => {
            expect(component.visibleImages).toEqual([]);
        });

        it('should limit the mosaic to 18 image tiles', () => {
            fixture.componentRef.setInput(
                'images',
                Array.from({ length: 24 }, (_, index) => ({
                    url: `img-${index}.jpg`,
                    alt: `Image ${index}`,
                })),
            );
            fixture.detectChanges();

            expect(component.visibleImages.length).toBe(18);
            expect(fixture.nativeElement.querySelectorAll('.text-mosaic__tile').length).toBe(18);
        });

        it('should render cloudinary images when publicId is provided', () => {
            fixture.componentRef.setInput('images', [
                { publicId: 'photo-01', alt: 'Cloudinary' },
                { url: 'plain.jpg', alt: 'Plain' },
            ]);
            fixture.detectChanges();

            const tiles = fixture.nativeElement.querySelectorAll('.text-mosaic__tile');
            expect(tiles[0].querySelector('ui-image')).toBeTruthy();
            expect(tiles[1].querySelector('img')?.getAttribute('src')).toBe('plain.jpg');
        });
    });

    describe('entrance animation', () => {
        it('should observe the section on AfterViewInit', () => {
            fixture.detectChanges();

            const observer = (component as any).observer as MockIntersectionObserver;
            expect(observer).toBeTruthy();
            expect(observer.observe).toHaveBeenCalled();
        });

        it('should reveal the section when it enters the viewport', () => {
            fixture.detectChanges();

            const observer = (component as any).observer as MockIntersectionObserver;
            observer.trigger(true);
            fixture.detectChanges();

            const section = fixture.nativeElement.querySelector('.text-mosaic');
            expect(component.isVisible()).toBe(true);
            expect(section.classList).toContain('text-mosaic--in');
            expect(observer.disconnect).toHaveBeenCalled();
        });

        it('should keep the section hidden while it is outside the viewport', () => {
            fixture.detectChanges();

            const observer = (component as any).observer as MockIntersectionObserver;
            observer.trigger(false);

            expect(component.isVisible()).toBe(false);
        });

        it('should reveal immediately without IntersectionObserver support', () => {
            const original = (window as any).IntersectionObserver;
            delete (window as any).IntersectionObserver;

            fixture.detectChanges();

            expect(component.isVisible()).toBe(true);
            expect((component as any).observer).toBeUndefined();

            (window as any).IntersectionObserver = original;
        });

        it('should reveal immediately with reduced motion', () => {
            mediaState.reduced = true;

            fixture.detectChanges();

            expect(component.isVisible()).toBe(true);
            expect((component as any).observer).toBeUndefined();
        });

        it('should disconnect the observer on destroy', () => {
            fixture.detectChanges();

            const observer = (component as any).observer as MockIntersectionObserver;
            component.ngOnDestroy();

            expect(observer.disconnect).toHaveBeenCalled();
        });
    });

    describe('server rendering', () => {
        it('should skip the observer on the server', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TextMosaicHeroComponent],
                providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
            });

            const serverFixture = TestBed.createComponent(TextMosaicHeroComponent);
            serverFixture.detectChanges();

            expect((serverFixture.componentInstance as any).observer).toBeUndefined();

            serverFixture.destroy();
        });
    });
});
