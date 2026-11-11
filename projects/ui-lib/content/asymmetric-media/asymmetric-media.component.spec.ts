import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsymmetricMediaComponent } from './asymmetric-media.component';
import { By } from '@angular/platform-browser';
import { CLOUDINARY_CLOUD_NAME } from '@lluc_llull/ui-lib/mapper';

describe('AsymmetricMediaComponent', () => {
  let component: AsymmetricMediaComponent;
  let fixture: ComponentFixture<AsymmetricMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser un componente Standalone, se declara en 'imports'
      imports: [AsymmetricMediaComponent],
      providers: [{ provide: CLOUDINARY_CLOUD_NAME, useValue: 'demo' }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsymmetricMediaComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have default direction set to "right"', () => {
    fixture.detectChanges();
    expect(component.direction).toBe('right');
  });

  it('should accept "left" as direction input', () => {
    component.direction = 'left';
    fixture.detectChanges();
    expect(component.direction).toBe('left');
  });

  it('should accept media input', () => {
    const mockMedia: any[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' }
    ];
    
    component.media = mockMedia;
    fixture.detectChanges();
    
    expect(component.media).toEqual(mockMedia);
    expect(component.media.length).toBe(2);
  });

  it('should apply "display: contents" style to the host element', () => {
    fixture.detectChanges();
    const hostElement = fixture.nativeElement as HTMLElement;
    
    // Verificamos que la propiedad 'host' del componente asigne correctamente el estilo
    expect(hostElement.style.display).toBe('contents');
  });

  it('should render ui-image components when media items have publicId and direction is "left"', () => {
    component.media = [
      { url: 'image1.jpg', alt: 'Image 1', publicId: 'media-left-1' },
      { url: 'image2.jpg', alt: 'Image 2', publicId: 'media-left-2' }
    ];
    component.direction = 'left';
    fixture.detectChanges();

    const images = fixture.nativeElement.querySelectorAll('ui-image.asymmetric-media-img');

    expect(images.length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('img.asymmetric-media-img').length).toBe(0);
    expect(images[0].querySelector('img').src).toContain('media-left-1');
    expect(images[1].querySelector('img').src).toContain('media-left-2');
  });

  it('should render img elements when media items have no publicId and direction is "left"', () => {
    component.media = [
      { url: '/images/left-1.jpg', alt: 'Image 1' },
      { url: '/images/left-2.jpg', alt: 'Image 2' }
    ];
    component.direction = 'left';
    fixture.detectChanges();

    const images = fixture.nativeElement.querySelectorAll('img.asymmetric-media-img');

    expect(images.length).toBe(2);
    expect(images[0].src).toContain('left-1.jpg');
    expect(images[1].src).toContain('left-2.jpg');
    expect(fixture.nativeElement.querySelectorAll('ui-image').length).toBe(0);
  });

  it('should render ui-image components when media items have publicId and direction is "right"', () => {
    component.media = [
      { url: 'image1.jpg', alt: 'Image 1', publicId: 'media-right-1' },
      { url: 'image2.jpg', alt: 'Image 2', publicId: 'media-right-2' }
    ];
    component.direction = 'right';
    fixture.detectChanges();

    const images = fixture.nativeElement.querySelectorAll('ui-image.asymmetric-media-img');

    expect(images.length).toBe(2);
    expect(images[0].querySelector('img').src).toContain('media-right-1');
    expect(images[1].querySelector('img').src).toContain('media-right-2');
  });
});