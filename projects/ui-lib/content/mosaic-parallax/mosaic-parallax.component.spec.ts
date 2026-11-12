import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CLOUDINARY_CLOUD_NAME } from '@lluc_llull/ui-lib/mapper';
import { MosaicParallaxComponent } from './mosaic-parallax.component';

class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();

    private callback: any;

    constructor(callback: any) {
        this.callback = callback;
    }

    trigger(isIntersecting: boolean) {
        this.callback([{ isIntersecting }]);
    }
}

class MockResizeObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
}

describe('MosaicParallaxComponent', () => {
    let component: MosaicParallaxComponent;
    let fixture: ComponentFixture<MosaicParallaxComponent>;

    const mediaState = { desktop: false, reduced: false };
    const mediaListeners: Record<string, () => void> = {};
    const removeMediaListener = vi.fn();
    const cancelFrame = vi.fn();
    const animationFrames: FrameRequestCallback[] = [];
    const originalMatchMedia = window.matchMedia;

    const flushAnimationFrames = (): void => {
        while (animationFrames.length > 0) {
            animationFrames.shift()!(0);
        }
    };

    beforeEach(async () => {
        mediaState.desktop = false;
        mediaState.reduced = false;
        Object.keys(mediaListeners).forEach((key) => delete mediaListeners[key]);
        animationFrames.length = 0;
        removeMediaListener.mockClear();
        cancelFrame.mockClear();

        // 👇 mock correcto (constructor real)
        (window as any).IntersectionObserver = MockIntersectionObserver;
        // El componente lee `window.matchMedia`; vi.stubGlobal solo parchea globalThis.
        (window as any).matchMedia = (query: string) => ({
            get matches() {
                return query.includes('prefers-reduced-motion')
                    ? mediaState.reduced
                    : mediaState.desktop;
            },
            addEventListener: (_type: string, listener: () => void) => {
                mediaListeners['change'] = listener;
            },
            removeEventListener: removeMediaListener,
        });
        vi.stubGlobal('ResizeObserver', MockResizeObserver);
        // rAF en cola: ejecutarlo síncrono reentra en el scheduler zoneless y rompe la CD.
        vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
            animationFrames.push(callback);
            return animationFrames.length;
        });
        vi.stubGlobal('cancelAnimationFrame', cancelFrame);

        await TestBed.configureTestingModule({
            imports: [MosaicParallaxComponent],
            providers: [
                { provide: PLATFORM_ID, useValue: 'browser' },
                { provide: CLOUDINARY_CLOUD_NAME, useValue: 'demo' },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MosaicParallaxComponent);
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

    describe('IntersectionObserver', () => {
        it('should initialize observer on AfterViewInit', () => {
            fixture.detectChanges();

            const observer = (component as any).observer;
            expect(observer).toBeTruthy();
            expect(observer.observe).toHaveBeenCalled();
        });

        it('should set isVisible to true when intersecting', () => {
            fixture.detectChanges();

            const observer = (component as any).observer as MockIntersectionObserver;

            observer.trigger(true);

            expect(component.isVisible()).toBe(true);
            expect(observer.disconnect).toHaveBeenCalled();
        });

        it('should NOT set isVisible when not intersecting', () => {
            fixture.detectChanges();

            const observer = (component as any).observer as MockIntersectionObserver;

            observer.trigger(false);

            expect(component.isVisible()).toBe(false);
        });
    });

    describe('diagonalFraction', () => {
        it('should return 0 for a single item', () => {
            fixture.componentRef.setInput('images', [{ url: 'img1.jpg', alt: 'img1' }]);

            expect(component.diagonalFraction(0)).toBe(0);
        });

        it('should ascend monotonically from 0 to 1', () => {
            fixture.componentRef.setInput('images', [
                { url: 'img1.jpg', alt: 'img1' },
                { url: 'img2.jpg', alt: 'img2' },
                { url: 'img3.jpg', alt: 'img3' },
                { url: 'img4.jpg', alt: 'img4' },
            ]);

            const fractions = [0, 1, 2, 3].map((index) => component.diagonalFraction(index));

            expect(fractions[0]).toBe(0);
            expect(fractions[3]).toBe(1);
            fractions.forEach((fraction, index) => {
                if (index > 0) {
                    expect(fraction).toBeGreaterThan(fractions[index - 1]);
                }
            });
        });

        it('should stay within 0 and 1 for any number of items', () => {
            for (let index = 0; index < 100; index++) {
                const fraction = component.diagonalFraction(index);
                expect(fraction).toBeGreaterThanOrEqual(0);
                expect(fraction).toBeLessThanOrEqual(1);
            }
        });
    });

    describe('template rendering', () => {
        it('should render title if provided', () => {
            fixture.componentRef.setInput('title', 'Test Title');
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('h2.subtitle');
            expect(el?.textContent.trim()).toBe('Test Title');
        });

        it('should NOT render title if not provided', () => {
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('h2.subtitle');
            expect(el).toBeNull();
        });

        it('should render text if provided', () => {
            fixture.componentRef.setInput('text', 'Test text');
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('p.text');
            expect(el?.textContent.trim()).toBe('Test text');
        });

        it('should render images when provided', () => {
            fixture.componentRef.setInput('images', [
                { url: 'img1.jpg', alt: 'img1' },
                { url: 'img2.jpg', alt: 'img2' },
            ]);
            fixture.detectChanges();

            const items = fixture.nativeElement.querySelectorAll('.mosaic-item');
            expect(items.length).toBe(2);
        });

        it('should render cloudinary images and item texts when provided', () => {
            fixture.componentRef.setInput('images', [
                {
                    publicId: 'photo-01',
                    alt: 'Cloudinary',
                    texts: { title: 'Feb 2026', text: 'A description' },
                },
                { url: 'plain.jpg', alt: 'Plain' },
            ]);
            fixture.detectChanges();

            const items = fixture.nativeElement.querySelectorAll('.mosaic-item');
            expect(items[0].querySelector('ui-image')).toBeTruthy();
            expect(items[0].querySelector('.mosaic-item__description')?.textContent).toBe(
                'A description',
            );
            expect(items[0].querySelector('.mosaic-item__date')?.textContent).toBe('Feb 2026');
            expect(items[0].querySelector('.mosaic-item__index')?.textContent?.trim()).toBe('01');
            expect(items[1].querySelector('.mosaic-item__content')).toBeNull();
        });

        it('should apply entrance class to the section when isVisible is true', () => {
            fixture.componentRef.setInput('images', [{ url: 'img1.jpg', alt: 'img1' }]);
            fixture.detectChanges();

            component.isVisible.set(true);
            fixture.detectChanges();

            const section = fixture.nativeElement.querySelector('.mosaic-parallax');
            expect(section.classList).toContain('mosaic-parallax--in');
        });
    });

    describe('pinned slider', () => {
        const images = [
            { url: 'img1.jpg', alt: 'img1' },
            { url: 'img2.jpg', alt: 'img2' },
            { url: 'img3.jpg', alt: 'img3' },
        ];

        const query = (selector: string) => fixture.nativeElement.querySelector(selector);

        const defineMetric = (element: Element, property: string, value: number) => {
            Object.defineProperty(element, property, { value, configurable: true });
        };

        it('should activate slider mode on desktop and measure the runway', () => {
            mediaState.desktop = true;
            fixture.componentRef.setInput('images', images);
            fixture.detectChanges();

            expect(query('.mosaic-parallax').classList).toContain('mosaic-parallax--slider');
            expect((component as any).resizeObserver.observe).toHaveBeenCalled();
            expect(query('.mosaic-parallax__stage').style.getPropertyValue('--scroll-distance')).toBe(
                '0px',
            );
        });

        it('should fit the diagonal to the header height and keep a gap below the text', () => {
            mediaState.desktop = true;
            fixture.componentRef.setInput('title', 'Title');
            fixture.componentRef.setInput('text', 'Text');
            fixture.componentRef.setInput('images', images);
            fixture.detectChanges();

            const stage = query('.mosaic-parallax__stage');
            const sticky = query('.mosaic-parallax__sticky');
            const header = query('.mosaic-parallax__header');
            const track = query('.mosaic-parallax__track');
            const firstCard = track.querySelector('.mosaic-item');

            defineMetric(sticky, 'clientHeight', 800);
            defineMetric(sticky, 'clientWidth', 1000);
            defineMetric(header, 'offsetHeight', 160);
            defineMetric(firstCard, 'offsetHeight', 300);
            defineMetric(track, 'scrollWidth', 2000);

            (component as any).measure();

            expect(track.style.getPropertyValue('--diagonal-total')).toBe('184px');
            expect(stage.style.getPropertyValue('--scroll-distance')).toBe('1000px');
            expect(track.style.transform).toBe('translate3d(0.00px, 0, 0)');
        });

        it('should cap the diagonal at the available space without a header', () => {
            mediaState.desktop = true;
            fixture.componentRef.setInput('images', images);
            fixture.detectChanges();

            const sticky = query('.mosaic-parallax__sticky');
            const track = query('.mosaic-parallax__track');
            const firstCard = track.querySelector('.mosaic-item');

            defineMetric(sticky, 'clientHeight', 700);
            defineMetric(firstCard, 'offsetHeight', 300);

            (component as any).fitDiagonal(sticky, track);

            expect(track.style.getPropertyValue('--diagonal-total')).toBe('280px');
        });

        it('should skip diagonal fitting when the track has no cards', () => {
            const fakeTrack = { querySelector: () => null } as any;

            expect(() => (component as any).fitDiagonal(document.createElement('div'), fakeTrack)).not.toThrow();
        });

        it('should slide the track according to the scroll progress', () => {
            mediaState.desktop = true;
            fixture.componentRef.setInput('images', images);
            fixture.detectChanges();

            const stage = query('.mosaic-parallax__stage');
            const track = query('.mosaic-parallax__track');

            (component as any).maxShift = 400;
            (component as any).scrollDistance = 800;

            vi.spyOn(stage, 'getBoundingClientRect').mockReturnValue({ top: -400 } as DOMRect);
            window.dispatchEvent(new Event('scroll'));
            flushAnimationFrames();

            expect(track.style.transform).toBe('translate3d(-200.00px, 0, 0)');
        });

        it('should reset the transform when there is no scroll distance left', () => {
            mediaState.desktop = true;
            fixture.componentRef.setInput('images', images);
            fixture.detectChanges();

            const track = query('.mosaic-parallax__track');

            (component as any).scrollDistance = 0;
            (component as any).update();

            expect(track.style.transform).toBe('translate3d(0, 0, 0)');
        });

        it('should exit silently when the track is missing', () => {
            (component as any).track = undefined;

            expect(() => (component as any).update()).not.toThrow();
        });

        it('should re-measure on window resize', () => {
            mediaState.desktop = true;
            fixture.componentRef.setInput('images', images);
            fixture.detectChanges();

            const measureSpy = vi.spyOn(component as any, 'measure');
            window.dispatchEvent(new Event('resize'));

            expect(measureSpy).toHaveBeenCalled();
        });

        it('should stop and reset the slider below the desktop breakpoint', () => {
            mediaState.desktop = true;
            fixture.componentRef.setInput('images', images);
            fixture.detectChanges();

            const section = query('.mosaic-parallax');
            const stage = query('.mosaic-parallax__stage');
            const track = query('.mosaic-parallax__track');

            mediaState.desktop = false;
            mediaListeners['change']();

            expect(section.classList.contains('mosaic-parallax--slider')).toBe(false);
            expect(stage.style.getPropertyValue('--scroll-distance')).toBe('');
            expect(track.style.getPropertyValue('--diagonal-total')).toBe('');
            expect(track.style.transform).toBe('');
            expect((component as any).maxShift).toBe(0);

            mediaState.desktop = true;
            mediaListeners['change']();

            expect(section.classList).toContain('mosaic-parallax--slider');
        });

        it('should clean up listeners and pending frames on destroy', () => {
            mediaState.desktop = true;
            fixture.componentRef.setInput('images', images);
            fixture.detectChanges();

            const observer = (component as any).resizeObserver as MockResizeObserver;
            (component as any).frame = 7;

            component.ngOnDestroy();

            expect(observer.disconnect).toHaveBeenCalled();
            expect(removeMediaListener).toHaveBeenCalled();
            expect(cancelFrame).toHaveBeenCalledWith(7);
        });
    });

    describe('environment guards', () => {
        it('should reveal immediately without IntersectionObserver support', () => {
            const original = (window as any).IntersectionObserver;
            delete (window as any).IntersectionObserver;

            (component as any).observeEntrance();

            expect(component.isVisible()).toBe(true);

            (window as any).IntersectionObserver = original;
        });

        it('should not initialize the slider without ResizeObserver support', () => {
            const original = (globalThis as any).ResizeObserver;
            delete (globalThis as any).ResizeObserver;

            (component as any).initSlider();

            expect((component as any).mediaQuery).toBeUndefined();

            (globalThis as any).ResizeObserver = original;
        });

        it('should skip animations entirely with reduced motion', () => {
            mediaState.reduced = true;
            // isVisible se setea dentro de ngAfterViewInit (durante la CD),
            // así que se omite la pasada de verificación.
            fixture.detectChanges(false);

            expect(component.isVisible()).toBe(true);
            expect((component as any).observer).toBeUndefined();
            expect((component as any).mediaQuery).toBeUndefined();
        });

        it('should do nothing on the server', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [MosaicParallaxComponent],
                providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
            });

            const serverFixture = TestBed.createComponent(MosaicParallaxComponent);
            serverFixture.detectChanges();

            expect((serverFixture.componentInstance as any).observer).toBeUndefined();

            serverFixture.componentInstance.ngOnDestroy();
            serverFixture.destroy();
        });
    });

    describe('ngOnDestroy', () => {
        it('should disconnect observer on destroy', () => {
            fixture.detectChanges();

            const observer = (component as any).observer;

            component.ngOnDestroy();

            expect(observer.disconnect).toHaveBeenCalled();
        });
    });
});
