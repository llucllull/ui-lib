import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';
import { StackedRowItemI, StackedRowsComponent } from './stacked-rows.component';

describe('StackedRowsComponent', () => {
    let component: StackedRowsComponent;
    let fixture: ComponentFixture<StackedRowsComponent>;

    const mockItems: StackedRowItemI[] = [
        { title: 'Item 1', text: 'Text 1' },
        { title: 'Item 2', text: 'Text 2' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StackedRowsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StackedRowsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('inputs', () => {
        it('should render title when provided', () => {
            fixture.componentRef.setInput('title', 'Servicios');
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('.subtitle, h1, h2');
            expect(el?.textContent?.trim()).toContain('Servicios');
        });

        it('should render text when provided', () => {
            fixture.componentRef.setInput('text', 'Descripción general');
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('.text');
            expect(el?.textContent?.trim()).toContain('Descripción general');
        });

        it('should render items when provided', () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            const items = fixture.nativeElement.querySelectorAll('.stacked-rows__items--item');
            expect(items.length).toBe(2);
        });

        it('should render item title and text correctly', () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            const firstItemTitle = fixture.nativeElement.querySelector(
                '.stacked-rows__items--item_title',
            );
            const firstItemText = fixture.nativeElement.querySelector(
                '.stacked-rows__items--item_text',
            );

            expect(firstItemTitle?.textContent?.trim()).toContain('Item 1');
            expect(firstItemText?.textContent?.trim()).toContain('Text 1');
        });
    });

    describe('scroll reveal', () => {
        it('reveals the intro and each item from below while scrolling', () => {
            fixture.componentRef.setInput('title', 'Servicios');
            fixture.componentRef.setInput('text', 'Descripción general');
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            const reveals = fixture.debugElement.queryAll(By.directive(ScrollRevealDirective));

            expect(reveals.length).toBe(3);
            expect(reveals.every((reveal) => reveal.injector.get(ScrollRevealDirective).from === 'bottom')).toBe(true);
        });
    });

    describe('edge cases', () => {
        it('should not render items container if no items provided', () => {
            fixture.componentRef.setInput('items', undefined);
            fixture.detectChanges();

            const itemsContainer = fixture.nativeElement.querySelector('.stacked-rows__items');
            expect(itemsContainer).toBeNull();
        });

        it('should render correctly with empty items array', () => {
            fixture.componentRef.setInput('items', []);
            fixture.detectChanges();

            const items = fixture.nativeElement.querySelectorAll('.stacked-rows__items--item');
            expect(items.length).toBe(0);
        });
    });
});
