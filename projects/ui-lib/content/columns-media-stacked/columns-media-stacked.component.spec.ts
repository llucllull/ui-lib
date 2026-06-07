import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnsMediaStackedComponent } from './columns-media-stacked.component';

describe('ColumnsMediaStackedComponent', () => {
  let component: ColumnsMediaStackedComponent;
  let fixture: ComponentFixture<ColumnsMediaStackedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnsMediaStackedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsMediaStackedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render texts and apply classes for left direction', () => {
    fixture.componentRef.setInput('leftColumn', 'Contenido Columna Izquierda');
    fixture.componentRef.setInput('rightColumn', 'Contenido Columna Derecha');
    fixture.componentRef.setInput('direction', 'left');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // Buscamos TODOS los párrafos que tengan tu clase real del HTML
    const columns = compiled.querySelectorAll('.columns-media-stacked__content-column');

    // Validamos que se hayan renderizado ambos elementos
    expect(columns.length).toBe(2);
    expect(columns[0].textContent).toContain('Contenido Columna Izquierda');
    expect(columns[1].textContent).toContain('Contenido Columna Derecha');

    // Verificamos tus clases de posicionamiento reales para direction === 'left'
    expect(columns[0].classList.contains('md:col-start-1')).toBeTrue();
    expect(columns[1].classList.contains('md:col-start-5')).toBeTrue();
  });

  it('should swap positions when direction is right', () => {
    fixture.componentRef.setInput('leftColumn', 'Contenido Columna Izquierda');
    fixture.componentRef.setInput('rightColumn', 'Contenido Columna Derecha');
    fixture.componentRef.setInput('direction', 'right');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const columns = compiled.querySelectorAll('.columns-media-stacked__content-column');

    expect(columns.length).toBe(2);

    // Verificamos tus clases de posicionamiento reales para direction === 'right'
    expect(columns[0].classList.contains('md:col-start-5')).toBeTrue();
    expect(columns[1].classList.contains('md:col-start-9')).toBeTrue();
  });

  it('should render image container and match its layout direction classes', () => {
    const mockImage: any = {
      publicId: 'v123456/test-image-id',
      src: 'assets/test-image.jpg',
      alt: 'Imagen de prueba'
    };

    fixture.componentRef.setInput('image', mockImage);
    fixture.componentRef.setInput('direction', 'right'); // Probamos una dirección para la imagen
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    
    // Buscamos el contenedor real de la imagen usando tu clase del HTML
    const imageContainer = compiled.querySelector('.columns-media-stacked__image');
    
    expect(imageContainer).toBeTruthy();
    // Verificamos que al ser direction 'right', el contenedor de la imagen empiece en md:col-start-3
    expect(imageContainer?.classList.contains('md:col-start-3')).toBeTrue();
  });
});