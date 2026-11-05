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
    expect(component.isBrandIcon).toBeTrue();
    expect(component.brandIcon?.path).toBeTruthy();
  });

  it('falls back to Lucide for an unknown icon', () => {
    component.name = 'not-a-real-icon';
    component.ngOnChanges();
    expect(component.isBrandIcon).toBeFalse();
    expect(component.brandIcon).toBeNull();
  });

  it('clears the brand icon when the name is empty', () => {
    component.name = '';
    component.ngOnChanges();
    expect(component.brandIcon).toBeNull();
  });
});
