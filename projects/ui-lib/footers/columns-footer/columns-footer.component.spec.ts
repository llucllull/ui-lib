import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsFooterComponent } from './columns-footer.component';

describe('ColumnsFooterComponent', () => {
  let component: ColumnsFooterComponent;
  let fixture: ComponentFixture<ColumnsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnsFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
