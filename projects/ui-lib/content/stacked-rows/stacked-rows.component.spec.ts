import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedRowsComponent } from './stacked-rows.component';

describe('StackedRowsComponent', () => {
  let component: StackedRowsComponent;
  let fixture: ComponentFixture<StackedRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedRowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
