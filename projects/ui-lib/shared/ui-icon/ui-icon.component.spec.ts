import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiIconComponent } from './ui-icon.component';

describe('UiIconComponent', () => {
    let component: UiIconComponent;
    let fixture: ComponentFixture<UiIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [UiIconComponent] }).compileComponents();
        fixture = TestBed.createComponent(UiIconComponent);
        component = fixture.componentInstance;
    });

    it('resolves a brand icon and exposes its path', () => {
        component.name = 'github';
        component.ngOnChanges();
        expect(component.isBrandIcon).toBe(true);
        expect(component.brandIcon?.path).toBeTruthy();
    });

    it('renders the brand icon svg with its path, size and color', () => {
        component.name = 'github';
        component.size = 32;
        component.color = '#123456';
        component.ngOnChanges();
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector('svg.ui-icon--brand');
        expect(svg).not.toBeNull();
        expect(svg.getAttribute('width')).toBe('32');
        expect(svg.getAttribute('height')).toBe('32');
        expect(svg.getAttribute('fill')).toBe('#123456');
        expect(svg.querySelector('path').getAttribute('d')).toBe(component.brandIcon?.path);
        expect(fixture.nativeElement.querySelector('lucide-icon')).toBeNull();
    });

    it('uses the Lucide icon for LinkedIn', () => {
        component.name = 'linkedin';
        fixture.detectChanges();
        expect(component.isBrandIcon).toBe(false);
        expect(component.brandIcon).toBeNull();
        expect(fixture.nativeElement.querySelector('lucide-icon svg')).not.toBeNull();
    });

    it('renders the Lucide icon with its bound size and color', () => {
        component.name = 'linkedin';
        component.size = 18;
        component.color = '#abcdef';
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector('lucide-icon svg');
        expect(svg).not.toBeNull();
        expect(svg.getAttribute('width')).toBe('18');
        expect(svg.getAttribute('height')).toBe('18');
        expect(svg.getAttribute('stroke')).toBe('#abcdef');
    });

    it('falls back to Lucide for an unknown icon', () => {
        component.name = 'not-a-real-icon';
        component.ngOnChanges();
        expect(component.isBrandIcon).toBe(false);
        expect(component.brandIcon).toBeNull();
    });

    it('clears the brand icon when the name is empty', () => {
        component.name = '';
        component.ngOnChanges();
        expect(component.brandIcon).toBeNull();
    });
});
