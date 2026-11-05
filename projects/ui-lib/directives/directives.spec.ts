import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderScrollDirective } from './header-scroll.directive';
import { HighlightDirective } from './highlight.directive';
import { LinkTypeDirective } from './link-type.directive';
import { ScrollRevealDirective } from './scroll-reveal.directive';

describe('HeaderScrollDirective', () => {
  it('updates the scrolled state according to the threshold', () => {
    const directive = new HeaderScrollDirective();
    directive.scrollThreshold = 60;
    const scrollY = spyOnProperty(window, 'scrollY', 'get').and.returnValue(61);
    directive.onScroll();
    expect(directive.isScrolled).toBeTrue();
    scrollY.and.returnValue(60);
    directive.onScroll();
    expect(directive.isScrolled).toBeFalse();
  });
});

describe('HighlightDirective', () => {
  it('builds the configured gradient and host styles', () => {
    const directive = new HighlightDirective();
    directive.highlightColor = '#ff0';
    directive.highlightThickness = 15;
    expect(directive.background).toContain('#ff0 65%');
    expect(directive.background).toContain('#ff0 80%');
    expect(directive.display).toBe('inline');
  });
});

describe('LinkTypeDirective', () => {
  const create = (url = '/es/home') => {
    const anchor = document.createElement('a');
    const router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl'], { url });
    return { anchor, router, directive: new LinkTypeDirective(router, new ElementRef(anchor), 'browser') };
  };

  it('resolves internal links using the router language and updates attributes', () => {
    const { anchor, directive } = create('/ca/page');
    directive.linkType = 'internal' as any;
    directive.href = 'about';
    expect(anchor.getAttribute('href')).toBe('/ca/about');
    expect(anchor.hasAttribute('target')).toBeFalse();
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    directive.onClick(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('configures external/pdf links and handles no-link clicks', () => {
    const { anchor, directive } = create();
    directive.linkType = 'external' as any;
    directive.href = 'https://example.com';
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toContain('noopener');
    directive.linkType = 'nolink' as any;
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    directive.onClick(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('scrolls to anchors and emits after scrolling', () => {
    const { directive } = create();
    const target = document.createElement('div');
    target.id = 'section';
    spyOn(target, 'getBoundingClientRect').and.returnValue({ top: 400 } as DOMRect);
    document.body.appendChild(target);
    spyOn(window, 'scrollTo');
    spyOn(directive.anchorClicked, 'emit');
    directive.linkType = 'anchor' as any;
    directive.href = '#section';
    const event = new MouseEvent('click');
    directive.onClick(event);
    expect(window.scrollTo).toHaveBeenCalled();
    expect(directive.anchorClicked.emit).toHaveBeenCalled();
    target.remove();
  });
});

describe('ScrollRevealDirective', () => {
  it('reveals immediately during server rendering', () => {
    const element = document.createElement('div');
    const styles: Record<string, string> = {};
    const renderer = { setStyle: (_element: unknown, name: string, value: string) => styles[name] = value };
    const directive = new ScrollRevealDirective(new ElementRef(element), renderer as any, 'server');
    directive.distance = '20px';
    directive.duration = '1s';
    directive.ngOnInit();
    expect(styles['opacity']).toBe('1');
    expect(styles['transform']).toBe('translateY(0)');
  });
});
