import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsymmetricMediaComponent } from './asymmetric-media.component';
import { By } from '@angular/platform-browser';

describe('AsymmetricMediaComponent', () => {
  let component: AsymmetricMediaComponent;
  let fixture: ComponentFixture<AsymmetricMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser un componente Standalone, se declara en 'imports'
      imports: [AsymmetricMediaComponent]
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
});