import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDocumentComponent } from './content-document.component';

describe('ContentDocumentComponent', () => {
  let component: ContentDocumentComponent;
  let fixture: ComponentFixture<ContentDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
