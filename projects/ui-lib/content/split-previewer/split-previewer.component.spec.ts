import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SplitPreviewerComponent, SplitPreviewerItemI } from './split-previewer.component';

describe('SplitPreviewerComponent', () => {
    let component: SplitPreviewerComponent;
    let fixture: ComponentFixture<SplitPreviewerComponent>;

    // Mock de datos para las pruebas
    const mockItems: SplitPreviewerItemI[] = [
        {
            title: 'Project 1',
            description: 'Desc 1',
            image: { url: 'image1.jpg', alt: 'Image1' },
            link: { url: '/p1', linkType: 'internal' } as any,
        },
        {
            title: 'Project 2',
            description: 'Desc 2',
            image: { url: 'image2.jpg', alt: 'Image2' },
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // Como es Standalone, se importa directamente
            imports: [SplitPreviewerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SplitPreviewerComponent);
        component = fixture.componentInstance;

        // Inicializamos inputs básicos
        component.items = mockItems;
        component.imageDefault = { url: 'default.jpg', alt: 'Default Image' };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate the correct count of items', () => {
        expect(component.count).toBe(2);
    });

    it('should display the default image initially', () => {
        const imgElement = fixture.debugElement.query(By.css('.preview-img')).nativeElement;
        expect(imgElement.src).toContain('default.jpg');
        expect(component.activeImage()).toBeUndefined();
    });

    it('should change activeImage on mouseenter and reset on mouseleave', () => {
        const firstItemLink = fixture.debugElement.query(By.css('.split-previewer__item-link'));

        // Simular Hover en el primer item
        firstItemLink.triggerEventHandler('mouseenter', null);
        fixture.detectChanges();

        expect(component.activeImage()).toBe('image1.jpg');

        const imgElement = fixture.debugElement.query(By.css('.preview-img')).nativeElement;
        expect(imgElement.src).toContain('image1.jpg');

        // Simular salida del ratón del contenedor de la lista
        const itemsContainer = fixture.debugElement.query(By.css('.split-previewer__items'));
        itemsContainer.triggerEventHandler('mouseleave', null);
        fixture.detectChanges();

        expect(component.activeImage()).toBeUndefined();
        expect(imgElement.src).toContain('default.jpg');
    });

    it('should apply the correct direction class', () => {
        component.direction = 'left';
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.split-previewer')).nativeElement;
        expect(container.classList).toContain('split-previewer--left');
    });

    it('should render the correct number of tags if present', () => {
        component.items = [{ title: 'T1', tags: ['Angular', 'SSR'] }];
        fixture.detectChanges();

        const tags = fixture.debugElement.queryAll(By.css('.split-previewer__item-tag'));
        expect(tags.length).toBe(2);
        expect(tags[0].nativeElement.textContent).toContain('Angular');
    });
});
