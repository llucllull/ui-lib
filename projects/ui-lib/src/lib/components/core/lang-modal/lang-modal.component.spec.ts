import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LangModalComponent } from './lang-modal.component';
import { UiLibLangItemI } from '../../../interfaces/ui-lib-lang-item.interface';

describe('LangModalComponent', () => {
  let component: LangModalComponent;
  let fixture: ComponentFixture<LangModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<LangModalComponent>>;

  const mockLangs = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
  ];

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [LangModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { langs: mockLangs, currentLang: 'es' } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar la lista de idiomas', () => {
    const items = fixture.debugElement.queryAll(By.css('.modal-item'));
    expect(items.length).toBe(2);
    expect(items[0].nativeElement.textContent).toContain('es');
    expect(items[1].nativeElement.textContent).toContain('en');
  });

  it('debería cerrar el modal con el idioma seleccionado al hacer click', () => {
    const items = fixture.debugElement.queryAll(By.css('li'));
    items[1].nativeElement.click();
    fixture.detectChanges();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(jasmine.objectContaining<UiLibLangItemI>({ code: 'en' }));
  });

  it('debería cerrar el modal al hacer click en el botón de cerrar', () => {
    const closeBtn = fixture.debugElement.query(By.css('.close-btn')).nativeElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });
});
