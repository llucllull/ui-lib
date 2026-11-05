import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiLibLangItemI } from '@lluc_llull/ui-lib/interfaces';
import { LangModalComponent } from './lang-modal.component';

describe('LangModalComponent', () => {
    let component: LangModalComponent;
    let fixture: ComponentFixture<LangModalComponent>;
    const mockLangs = [
        { id: 1, code: 'es', label: 'Español' },
        { id: 2, code: 'en', label: 'English' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LangModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LangModalComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('langs', mockLangs);
        fixture.detectChanges();
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debería renderizar la lista de idiomas', () => {
        const items = fixture.debugElement.queryAll(By.css('.modal-item'));
        expect(items.length).toBe(2);
        expect(items[0].nativeElement.textContent).toContain('Español');
        expect(items[1].nativeElement.textContent).toContain('English');
    });

    it('debería cerrar el modal con el idioma seleccionado al hacer click', () => {
        const selectSpy = vi.spyOn(component.select, 'emit');
        const items = fixture.debugElement.queryAll(By.css('li'));
        items[1].nativeElement.click();
        fixture.detectChanges();

        expect(selectSpy).toHaveBeenCalledWith(expect.objectContaining<Partial<UiLibLangItemI>>({ code: 'en' }));
    });

    it('debería cerrar el modal al hacer click en el botón de cerrar', () => {
        const closeSpy = vi.spyOn(component.close, 'emit');
        const closeBtn = fixture.debugElement.query(By.css('.close-btn')).nativeElement;
        closeBtn.click();
        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalled();
    });
});
