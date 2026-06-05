import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitShowcaseComponent } from './split-showcase.component';

describe('SplitShowcaseComponent', () => {
  let component: SplitShowcaseComponent;
  let fixture: ComponentFixture<SplitShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitShowcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
