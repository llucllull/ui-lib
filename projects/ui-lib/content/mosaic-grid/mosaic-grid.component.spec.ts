import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosaicGridComponent } from './mosaic-grid.component';

describe('MosaicGridComponent', () => {
  let component: MosaicGridComponent;
  let fixture: ComponentFixture<MosaicGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MosaicGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosaicGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
