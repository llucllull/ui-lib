import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CategoryProgressComponent, ProgressCategoryI } from './category-progress.component';

describe('CategoryProgressComponent', () => {
    let component: CategoryProgressComponent;
    let fixture: ComponentFixture<CategoryProgressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CategoryProgressComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryProgressComponent);
        component = fixture.componentInstance;
    });

    it('debería crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debería renderizar el pretitle si existe', () => {
        component.pretitle = 'Pre-título de prueba';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.pretitle'))?.nativeElement;
        expect(el.textContent).toContain('Pre-título de prueba');
    });

    it('debería renderizar el title si existe', () => {
        component.title = 'Título principal';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.title'))?.nativeElement;
        expect(el.textContent).toContain('Título principal');
    });

    describe('categories input', () => {
        it('no debería renderizar categorías si no se pasa @Input categories', () => {
            fixture.detectChanges();
            const categories = fixture.debugElement.queryAll(By.css('.category'));
            expect(categories.length).toBe(0);
        });

        it('debería renderizar tantas categorías como se pasen en @Input categories', () => {
            const mockCategories: ProgressCategoryI[] = [
                {
                    title: 'Frontend',
                    items: [
                        { label: 'Angular', value: 80 },
                        { label: 'Vue', value: 60 },
                    ],
                },
                {
                    title: 'Backend',
                    items: [
                        { label: 'Laravel', value: 90 },
                        { label: 'Node.js', value: 70 },
                    ],
                },
            ];

            component.categories = mockCategories;
            fixture.detectChanges();

            const categories = fixture.debugElement.queryAll(By.css('.category'));
            expect(categories.length).toBe(2);

            // Primera categoría
            const firstCategoryTitle = categories[0].query(By.css('.subtitle')).nativeElement
                .textContent;
            expect(firstCategoryTitle).toContain('Frontend');

            const firstCategoryItems = categories[0].queryAll(By.css('.item'));
            expect(firstCategoryItems.length).toBe(2);

            const firstItemLabel = firstCategoryItems[0].query(By.css('.label')).nativeElement
                .textContent;
            expect(firstItemLabel).toContain('Angular');

            const firstItemFill = firstCategoryItems[0].query(By.css('.fill'))
                .nativeElement as HTMLElement;
            expect(firstItemFill.style.width).toBe('80%');
        });
    });
});
