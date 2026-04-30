import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MosaicParallaxComponent } from './mosaic-parallax.component';
import { PLATFORM_ID } from '@angular/core';

describe('MosaicParallaxComponent', () => {
  let component: MosaicParallaxComponent;
  let fixture: ComponentFixture<MosaicParallaxComponent>;

  // 👇 mock de IntersectionObserver
  let observeMock: jasmine.Spy;
  let disconnectMock: jasmine.Spy;

  beforeEach(async () => {
    observeMock = jasmine.createSpy('observe');
    disconnectMock = jasmine.createSpy('disconnect');

    (window as any).IntersectionObserver = jasmine
      .createSpy('IntersectionObserver')
      .and.callFake((callback: any) => {
        return {
          observe: observeMock,
          disconnect: disconnectMock,
          trigger: (isIntersecting: boolean) => {
            callback([{ isIntersecting }]);
          },
        };
      });

    await TestBed.configureTestingModule({
      imports: [MosaicParallaxComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }, // 👈 importante
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MosaicParallaxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('IntersectionObserver', () => {
    it('should initialize observer on AfterViewInit', () => {
      fixture.detectChanges(); // dispara ngAfterViewInit

      expect(window.IntersectionObserver).toHaveBeenCalled();
      expect(observeMock).toHaveBeenCalled();
    });

    it('should set isVisible to true when intersecting', () => {
      fixture.detectChanges();

      const observerInstance = (window.IntersectionObserver as any).calls.mostRecent().returnValue;

      observerInstance.trigger(true);

      expect(component.isVisible()).toBeTrue();
      expect(disconnectMock).toHaveBeenCalled();
    });

    it('should NOT set isVisible when not intersecting', () => {
      fixture.detectChanges();

      const observerInstance = (window.IntersectionObserver as any).calls.mostRecent().returnValue;

      observerInstance.trigger(false);

      expect(component.isVisible()).toBeFalse();
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

    it('should apply visible class when isVisible is true', () => {
      fixture.componentRef.setInput('images', [
        { url: 'img1.jpg', alt: 'img1' },
      ]);
      fixture.detectChanges();

      component.isVisible.set(true);
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.mosaic-item');
      expect(item.classList).toContain('mosaic-item--visible');
    });
  });

  describe('ngOnDestroy', () => {
    it('should disconnect observer on destroy', () => {
      fixture.detectChanges();

      component.ngOnDestroy();

      expect(disconnectMock).toHaveBeenCalled();
    });
  });
});