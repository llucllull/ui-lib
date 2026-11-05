import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaIntroComponent } from './media-intro.component';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

describe('MediaIntroComponent', () => {
  let component: MediaIntroComponent;
  let fixture: ComponentFixture<MediaIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente Standalone con sus dependencias reales directamente
      imports: [MediaIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaIntroComponent);
    component = fixture.componentInstance;
    // Quitamos el detectChanges de aquí para que no congele el estado OnPush antes de tiempo
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render texts and apply classes for left direction', () => {
    // Asignamos las propiedades reales
    fixture.componentRef.setInput('highlightedText', 'Texto Destacado');
    fixture.componentRef.setInput('secondaryText', 'Texto Secundario');
    fixture.componentRef.setInput('direction', 'left');
    
    // Forzamos la detección de cambios en la estrategia OnPush
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // Verificamos que los elementos existan en el DOM y tengan el contenido correcto
    const mainTextEl = compiled.querySelector('.media-intro__content--main-text');
    const secondaryTextEl = compiled.querySelector('.media-intro__content--secondary-text');

    expect(mainTextEl?.textContent).toContain('Texto Destacado');
    expect(secondaryTextEl?.textContent).toContain('Texto Secundario');

    // Verificamos que se apliquen las clases de posicionamiento para 'left'
    expect(mainTextEl?.classList.contains('md:col-start-1')).toBeTrue();
    expect(secondaryTextEl?.classList.contains('md:col-start-7')).toBeTrue();
  });

  it('should swap positions when direction is right', () => {
    fixture.componentRef.setInput('highlightedText', 'Texto Destacado');
    fixture.componentRef.setInput('secondaryText', 'Texto Secundario');
    fixture.componentRef.setInput('direction', 'right');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const mainTextEl = compiled.querySelector('.media-intro__content--main-text');
    const secondaryTextEl = compiled.querySelector('.media-intro__content--secondary-text');

    // Verificamos que se inviertan las clases de inicio de grid según la directiva
    expect(mainTextEl?.classList.contains('md:col-start-7')).toBeTrue();
    expect(secondaryTextEl?.classList.contains('md:col-start-1')).toBeTrue();
  });

  it('should render media component when media input is provided', () => {
    const mockMedia: any = {
      src: 'image.jpg',
      alt: 'Imagen'
      // Añade aquí propiedades obligatorias adicionales de tu interfaz UiLibImageI si las hay
    };

    fixture.componentRef.setInput('media', mockMedia);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    
    // Comprobamos que el contenedor de media se renderiza en el DOM
    const mediaContainer = compiled.querySelector('.media-intro__media');
    expect(mediaContainer).toBeTruthy();
  });
});