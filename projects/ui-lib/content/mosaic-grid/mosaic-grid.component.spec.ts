import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

import { MosaicGridComponent } from './mosaic-grid.component';

describe('MosaicGridComponent', () => {
  let component: MosaicGridComponent;
  let fixture: ComponentFixture<MosaicGridComponent>;

  const makeImages = (count: number, withPublicId: boolean): UiLibImageI[] =>
    Array.from({ length: count }, (_, index) => {
      const image: UiLibImageI = { url: `img${index + 1}.jpg`, alt: `Image ${index + 1}` };
      if (withPublicId) {
        image.publicId = `public-id-${index + 1}`;
      }
      return image;
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MosaicGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosaicGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('image grouping', () => {
    it('should create no groups when images is empty', () => {
      fixture.componentRef.setInput('images', []);
      fixture.detectChanges();

      expect(component.imageGroups).toEqual([]);
      expect(fixture.nativeElement.querySelectorAll('ui-image, img').length).toBe(0);
    });

    it('should create a single group with an empty second row for 3 images', () => {
      fixture.componentRef.setInput('images', makeImages(3, true));
      fixture.detectChanges();

      expect(component.imageGroups.length).toBe(1);
      expect(component.imageGroups[0].row1.length).toBe(3);
      expect(component.imageGroups[0].row2.length).toBe(0);

      expect(fixture.nativeElement.querySelectorAll('ui-image').length).toBe(3);
      expect(fixture.nativeElement.querySelectorAll('div.mosaic-grid__images').length).toBe(1);
    });

    it('should create a single group with one image in the second row for 4 images', () => {
      fixture.componentRef.setInput('images', makeImages(4, true));
      fixture.detectChanges();

      expect(component.imageGroups.length).toBe(1);
      expect(component.imageGroups[0].row1.length).toBe(3);
      expect(component.imageGroups[0].row2.length).toBe(1);

      expect(fixture.nativeElement.querySelectorAll('ui-image').length).toBe(4);
      expect(fixture.nativeElement.querySelectorAll('div.mosaic-grid__images').length).toBe(2);
    });

    it('should fill both rows of a group for 5 images', () => {
      fixture.componentRef.setInput('images', makeImages(5, true));
      fixture.detectChanges();

      expect(component.imageGroups.length).toBe(1);
      expect(component.imageGroups[0].row1.length).toBe(3);
      expect(component.imageGroups[0].row2.length).toBe(2);

      const images = fixture.nativeElement.querySelectorAll('ui-image');
      expect(images.length).toBe(5);
      expect(images[2].classList.contains('image-half-height')).toBe(true);
      expect(images[3].classList.contains('image-half-height')).toBe(true);
      expect(images[4].classList.contains('md:col-span-8')).toBe(true);
    });

    it('should create two groups for 7 images', () => {
      fixture.componentRef.setInput('images', makeImages(7, true));
      fixture.detectChanges();

      expect(component.imageGroups.length).toBe(2);
      expect(component.imageGroups[1].row1.length).toBe(2);
      expect(component.imageGroups[1].row2.length).toBe(0);

      expect(fixture.nativeElement.querySelectorAll('ui-image').length).toBe(7);
      expect(fixture.nativeElement.querySelectorAll('div.mosaic-grid__images').length).toBe(3);
    });
  });

  describe('template rendering', () => {
    it('should render text when provided', () => {
      fixture.componentRef.setInput('text', 'Intro <strong>text</strong>');
      fixture.detectChanges();

      const el = fixture.nativeElement.querySelector('.mosaic-grid__text');
      expect(el).toBeTruthy();
      expect(el.innerHTML).toContain('<strong>text</strong>');
    });

    it('should render ui-image elements when publicId is provided', () => {
      fixture.componentRef.setInput('images', makeImages(5, true));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ui-image').length).toBe(5);
      expect(fixture.nativeElement.querySelectorAll('img').length).toBe(0);
    });

    it('should render plain img elements when publicId is missing', () => {
      fixture.componentRef.setInput('images', makeImages(5, false));
      fixture.detectChanges();

      const imgs = fixture.nativeElement.querySelectorAll('img');
      expect(imgs.length).toBe(5);
      expect(fixture.nativeElement.querySelectorAll('ui-image').length).toBe(0);
      expect(imgs[0].getAttribute('src')).toBe('img1.jpg');
      expect(imgs[0].getAttribute('alt')).toBe('Image 1');
    });
  });
});
