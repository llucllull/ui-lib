import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLibComponent } from './ui-lib.component';

describe('UiLibComponent', () => {
  let fixture: ComponentFixture<UiLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [UiLibComponent] }).compileComponents();
    fixture = TestBed.createComponent(UiLibComponent);
    fixture.detectChanges();
  });

  it('creates and renders its host message', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('ui-lib works!');
  });
});
