import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkType } from '../../directives';
import { SplitPreviewerComponent, SplitPreviewerItemI } from './split-previewer.component';

const mockItems: SplitPreviewerItemI[] = [
    {
        title: 'Project Alpha',
        description: 'A test project',
        tags: ['Angular', 'TypeScript'],
        link: { url: 'https://example.com', linkType: LinkType.External, label: 'View Project' },
        image: { url: 'https://cdn.example.com/alpha.jpg', alt: 'Project Alpha Image' },
    },
    {
        title: 'Project Beta',
        description: 'Another test project',
        tags: ['SSG'],
        link: { url: 'https://beta.com', linkType: LinkType.External, label: 'View Project' },
        image: { url: 'https://cdn.example.com/beta.jpg', alt: 'Project Beta Image' },
    },
];

describe('SplitPreviewerComponent', () => {
    let component: SplitPreviewerComponent;
    let fixture: ComponentFixture<SplitPreviewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SplitPreviewerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SplitPreviewerComponent);
        component = fixture.componentInstance;
        // ❌ quitamos detectChanges aquí
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('count getter', () => {
        it('should return 0 when items is undefined', () => {
            expect(component.count).toBe(0);
        });

        it('should return correct count when items are set', () => {
            fixture.componentRef.setInput('items', mockItems);
            expect(component.count).toBe(2);
        });
    });

    describe('activeImage signal', () => {
        it('should start as undefined', () => {
            expect(component.activeImage()).toBeUndefined();
        });

        it('should update when set', () => {
            component.activeImage.set('https://cdn.example.com/alpha.jpg');
            expect(component.activeImage()).toBe('https://cdn.example.com/alpha.jpg');
        });

        it('should reset to undefined on mouseleave', () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            component.activeImage.set('https://cdn.example.com/alpha.jpg');

            const el = fixture.nativeElement.querySelector('.split-previewer__items');
            el.dispatchEvent(new Event('mouseleave'));

            fixture.detectChanges();

            expect(component.activeImage()).toBeUndefined();
        });
    });

    describe('template rendering', () => {
        it('should not render title when not provided', () => {
            fixture.detectChanges();
            const el = fixture.nativeElement.querySelector('h1.title');
            expect(el).toBeNull();
        });

        it('should render title when provided', () => {
            fixture.componentRef.setInput('title', 'Proyectos');
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('h1.title');
            expect(el?.textContent?.trim()).toBe('Proyectos');
        });

        it('should not render count when items is empty', () => {
            fixture.detectChanges();
            const el = fixture.nativeElement.querySelector('span.count');
            expect(el).toBeNull();
        });

        it('should render correct number of items', () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            const links = fixture.nativeElement.querySelectorAll('.split-previewer__item-link');
            expect(links.length).toBe(2);
        });

        it('should render tags for items that have them', () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            const tags = fixture.nativeElement.querySelectorAll('.split-previewer__item-tag');
            expect(tags.length).toBe(3);
        });

        it('should use imageDefault when activeImage is undefined', () => {
            component.imageDefault = {
                url: 'https://cdn.example.com/default.jpg',
                alt: 'Default Image',
            };

            fixture.detectChanges();

            const img = fixture.nativeElement.querySelector('img.preview-img');
            expect(img.src).toContain('default.jpg');
        });

        it('should use activeImage when set', () => {
            component.imageDefault = {
                url: 'https://cdn.example.com/default.jpg',
                alt: 'Default Image',
            };

            component.activeImage.set('https://cdn.example.com/active.jpg');
            fixture.detectChanges();

            const img = fixture.nativeElement.querySelector('img.preview-img');
            expect(img.src).toContain('active.jpg');
        });

        it('should apply direction class', () => {
            fixture.componentRef.setInput('direction', 'left');
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('.split-previewer');
            expect(el.classList).toContain('split-previewer--left');
        });

        it('should default direction to right', () => {
            fixture.detectChanges();

            const el = fixture.nativeElement.querySelector('.split-previewer');
            expect(el.classList).toContain('split-previewer--right');
        });

        it('should set activeImage on mouseenter of an item', () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            const firstLink = fixture.nativeElement.querySelector('.split-previewer__item-link');

            firstLink.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();

            expect(component.activeImage()).toBe('https://cdn.example.com/alpha.jpg');
        });
    });
});