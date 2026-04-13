import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMinimalComponent } from './contact-minimal.component';

describe('ContactMinimalComponent', () => {
  let component: ContactMinimalComponent;
  let fixture: ComponentFixture<ContactMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMinimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
