import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CLOUDINARY_CLOUD_NAME } from '@lluc_llull/ui-lib/mapper';
import { UiImageComponent } from './ui-image.component';

describe('UiImageComponent', () => {
  let component: UiImageComponent;
  let fixture: ComponentFixture<UiImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiImageComponent],
      providers: [{ provide: CLOUDINARY_CLOUD_NAME, useValue: 'demo' }],
    }).compileComponents();
    fixture = TestBed.createComponent(UiImageComponent);
    component = fixture.componentInstance;
  });

  it('initializes a lazy Cloudinary image and aspect ratio', () => {
    component.publicId = 'sample';
    component.width = 16;
    component.height = 9;
    fixture.detectChanges();
    expect(component.img).toBeTruthy();
    expect(component.plugins.length).toBe(2);
    expect(component.aspectRatioStyle).toBe('16 / 9');
  });

  it('does not add lazy loading when eager is enabled', () => {
    component.publicId = 'sample';
    component.eager = true;
    fixture.detectChanges();
    expect(component.plugins.length).toBe(1);
    expect(component.aspectRatioStyle).toBeNull();
  });

  it('prefers the explicit cloud name over the injected one', () => {
    component.publicId = 'sample';
    component.cloudName = 'explicit-cloud';
    fixture.detectChanges();
    expect(component.img.toURL()).toContain('explicit-cloud');
  });

  it('warns and leaves the image uninitialized without a cloud name', () => {
    const warn = vi.spyOn(console, 'warn');
    const imageWithoutCloud = new UiImageComponent(undefined);
    imageWithoutCloud.publicId = 'sample';
    imageWithoutCloud.ngOnInit();
    expect(imageWithoutCloud.img).toBeUndefined();
    expect(warn).toHaveBeenCalled();
  });
});
