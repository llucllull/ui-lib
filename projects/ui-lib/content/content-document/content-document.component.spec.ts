import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDocumentComponent, ContentDocumentItemI } from './content-document.component';

describe('ContentDocumentComponent', () => {
  let component: ContentDocumentComponent;
  let fixture: ComponentFixture<ContentDocumentComponent>;

  const mockItems: ContentDocumentItemI[] = [
    { title: 'Item 1', text: 'Text <em>1</em>' },
    { title: 'Item 2', text: 'Text 2' }
  ];

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

  describe('template rendering', () => {
    it('should not render the title when not provided', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.content-document__title')).toBeNull();
    });

    it('should render the title when provided', () => {
      fixture.componentRef.setInput('title', 'Document title');
      fixture.detectChanges();

      const el = fixture.nativeElement.querySelector('.content-document__title h1');
      expect(el?.textContent?.trim()).toBe('Document title');
    });

    it('should not render the items container when items is not provided', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.content-document__items')).toBeNull();
    });

    it('should render one block per item when items is provided', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.content-document__items--item').length).toBe(2);
    });

    it('should render item title and text', () => {
      fixture.componentRef.setInput('items', mockItems);
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.content-document__items--item_title');
      const text = fixture.nativeElement.querySelector('.content-document__items--item_text');

      expect(title?.textContent?.trim()).toBe('Item 1');
      expect(text?.textContent).toContain('Text');
      expect(text?.innerHTML).toContain('<em>1</em>');
    });
  });
});
