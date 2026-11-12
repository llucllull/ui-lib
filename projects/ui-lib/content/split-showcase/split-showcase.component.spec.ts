import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLibButtonI } from '@lluc_llull/ui-lib/interfaces';

import { LinkType } from '../../directives';
import { SplitShowcaseComponent, SplitShowcaseMetaItemI } from './split-showcase.component';

describe('SplitShowcaseComponent', () => {
  let component: SplitShowcaseComponent;
  let fixture: ComponentFixture<SplitShowcaseComponent>;

  const mockButtons: UiLibButtonI[] = [
    { label: 'View projects', url: 'https://example.com/projects', linkType: LinkType.External, icon: 'move-right' },
    { label: 'GitHub', url: 'https://github.com', linkType: LinkType.External, icon: 'github' }
  ];

  const mockMetas: SplitShowcaseMetaItemI[] = [
    { label: 'Role', value: 'Developer' },
    { label: 'Year', value: '2026' }
  ];

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

  describe('template rendering', () => {
    it('should render title, subtitle and description when provided', () => {
      fixture.componentRef.setInput('title', 'About');
      fixture.componentRef.setInput('subtitle', 'Experience');
      fixture.componentRef.setInput('description', 'Some description');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.split-showcase__metas--title')?.textContent?.trim()).toBe('About');
      expect(fixture.nativeElement.querySelector('.split-showcase__content--subtitle')?.textContent?.trim()).toBe('Experience');
      expect(fixture.nativeElement.querySelector('.split-showcase__content--description')?.textContent?.trim()).toBe('Some description');
    });

    it('should not render the buttons group when buttons is empty', () => {
      fixture.componentRef.setInput('buttons', []);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.btn-group')).toBeNull();
    });

    it('should render a link with icon and label for each button', () => {
      fixture.componentRef.setInput('buttons', mockButtons);
      fixture.detectChanges();

      const links = fixture.nativeElement.querySelectorAll('.btn-link');
      expect(links.length).toBe(2);
      expect(links[0].getAttribute('href')).toBe('https://example.com/projects');
      expect(links[0].textContent).toContain('View projects');
      expect(fixture.nativeElement.querySelectorAll('ui-icon').length).toBe(2);
    });

    it('should not render meta items when metas is not provided', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.split-showcase__metas--item').length).toBe(0);
    });

    it('should render one item per meta with label and value', () => {
      fixture.componentRef.setInput('metas', mockMetas);
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.split-showcase__metas--item');
      expect(items.length).toBe(2);

      expect(fixture.nativeElement.querySelector('.split-showcase__metas--item-label')?.textContent).toContain('Role');
      expect(fixture.nativeElement.querySelector('.split-showcase__metas--item-value')?.textContent?.trim()).toBe('Developer');
    });
  });
});
