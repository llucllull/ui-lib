import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnsFooterComponent, ColumnsFooterItemI } from './columns-footer.component';
import { By } from '@angular/platform-browser';

describe('ColumnsFooterComponent', () => {
  let component: ColumnsFooterComponent;
  let fixture: ComponentFixture<ColumnsFooterComponent>;

  const mockColumns: ColumnsFooterItemI[] = [
    {
      title: 'Column 1',
      items: [
        { label: 'Link 1', url: '/link1', linkType: 'internal' } as any,
        { label: 'Link 2', url: '/link2', linkType: 'external' } as any,
      ],
    },
    {
      title: 'Column 2',
      items: [
        { label: 'Link 3', url: '/link3', linkType: 'internal' } as any,
      ],
    },
    {
      title: 'Column 3',
      items: [
        { label: 'Link 4', url: '/link4', linkType: 'internal' } as any,
        { label: 'Link 5', url: '/link5', linkType: 'external' } as any,
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnsFooterComponent], // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnsFooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all columns when provided', () => {
    component.columns = mockColumns;
    fixture.detectChanges();

    const columns = fixture.debugElement.queryAll(By.css('[class*="columns-footer__"]'));
    expect(columns.length).toBeGreaterThan(0);
  });

  it('should render column titles', () => {
    component.columns = mockColumns;
    fixture.detectChanges();

    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles.length).toBe(3);
    expect(titles[0].nativeElement.textContent).toContain('Column 1');
  });

  it('should render links inside columns', () => {
    component.columns = mockColumns;
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].nativeElement.getAttribute('href')).toBe('/link1');
  });

  it('should not render columns if input is undefined', () => {
    component.columns = undefined;
    fixture.detectChanges();

    const titles = fixture.debugElement.queryAll(By.css('h4'));
    expect(titles.length).toBe(0);
  });

  it('should render copyright when provided', () => {
    component.copyright = {
      year: '2025',
      name: 'My Company',
      rights: 'All rights reserved',
    };

    fixture.detectChanges();

    const copyright = fixture.debugElement.query(By.css('.columns-footer__copyright-text'));
    expect(copyright).toBeTruthy();
    expect(copyright.nativeElement.textContent).toContain('2025');
  });

  it('should not render copyright when not provided', () => {
    component.copyright = undefined;
    fixture.detectChanges();

    const copyright = fixture.debugElement.query(By.css('.columns-footer__copyright-text'));
    expect(copyright).toBeFalsy();
  });
});