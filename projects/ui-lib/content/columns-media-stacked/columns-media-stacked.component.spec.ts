import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnsMediaStackedComponent } from './columns-media-stacked.component';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { AnyPixelFormat } from 'three';

describe('ColumnsMediaStackedComponent', () => {
  let component: ColumnsMediaStackedComponent;
  let fixture: ComponentFixture<ColumnsMediaStackedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente Standalone con todas sus dependencias reales
      imports: [ColumnsMediaStackedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsMediaStackedComponent);
    component = fixture.componentInstance;
    // No ejecutamos detectChanges aquí para evitar congelar el estado inicial OnPush
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render texts and apply classes for left direction', () => {
    // Seteamos los inputs reales utilizando la API moderna de Angular
    fixture.componentRef.setInput('leftColumn', 'Contenido Columna Izquierda');
    fixture.componentRef.setInput('rightColumn', 'Contenido Columna Derecha');
    fixture.componentRef.setInput('direction', 'left');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // Seleccionamos los elementos basándonos en las clases que estructuramos antes
    const leftTextEl = compiled.querySelector('.media-intro__content--main-text');
    const rightTextEl = compiled.querySelector('.media-intro__content--secondary-text');

    expect(leftTextEl?.textContent).toContain('Contenido Columna Izquierda');
    expect(rightTextEl?.textContent).toContain('Contenido Columna Derecha');

    // Verificamos que con direction: 'left', la columna izquierda empiece en 1 y la derecha en 7
    expect(leftTextEl?.classList.contains('md:col-start-1')).toBeTrue();
    expect(rightTextEl?.classList.contains('md:col-start-7')).toBeTrue();
  });

  it('should swap positions when direction is right', () => {
    fixture.componentRef.setInput('leftColumn', 'Contenido Columna Izquierda');
    fixture.componentRef.setInput('rightColumn', 'Contenido Columna Derecha');
    fixture.componentRef.setInput('direction', 'right');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const leftTextEl = compiled.querySelector('.media-intro__content--main-text');
    const rightTextEl = compiled.querySelector('.media-intro__content--secondary-text');

    // Verificamos que al invertir a 'right', las posiciones del grid se intercambien (7 y 1)
    expect(leftTextEl?.classList.contains('md:col-start-7')).toBeTrue();
    expect(rightTextEl?.classList.contains('md:col-start-1')).toBeTrue();
  });

  it('should render image container when image input is provided', () => {
    const mockImage: any = {
      src: 'assets/test-image.jpg',
      alt: 'Imagen de prueba'
    };

    fixture.componentRef.setInput('image', mockImage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificamos que el contenedor del media/image se renderice correctamente en el DOM
    const imageContainer = compiled.querySelector('.media-intro__media');
    expect(imageContainer).toBeTruthy();
  });
});