import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderScrollDirective } from './header-scroll.directive';
import { HighlightDirective } from './highlight.directive';
import { LinkTypeDirective } from './link-type.directive';
import { ScrollRevealDirective } from './scroll-reveal.directive';
import { ScrollTextRevealDirective } from './scroll-text-reveal.directive';

describe('HeaderScrollDirective', () => {
  it('updates the scrolled state according to the threshold', () => {
    const directive = new HeaderScrollDirective();
    directive.scrollThreshold = 60;
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(61);
    directive.onScroll();
    expect(directive.isScrolled).toBe(true);
    scrollY.mockReturnValue(60);
    directive.onScroll();
    expect(directive.isScrolled).toBe(false);
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
    const router = { navigateByUrl: vi.fn(), url } as unknown as Router;
    return { anchor, router, directive: new LinkTypeDirective(router, new ElementRef(anchor), 'browser') };
  };

  it('resolves internal links using the router language and updates attributes', () => {
    const { anchor, directive } = create('/ca/page');
    directive.linkType = 'internal' as any;
    directive.href = 'about';
    expect(anchor.getAttribute('href')).toBe('/ca/about');
    expect(anchor.hasAttribute('target')).toBe(false);
    const event = new MouseEvent('click');
    vi.spyOn(event, 'preventDefault');
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
    vi.spyOn(event, 'preventDefault');
    directive.onClick(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('scrolls to anchors and emits after scrolling', () => {
    const { directive } = create();
    const target = document.createElement('div');
    target.id = 'section';
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ top: 400 } as DOMRect);
    document.body.appendChild(target);
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    vi.spyOn(directive.anchorClicked, 'emit');
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
  const create = () => {
    const element = document.createElement('div');
    const styles: Record<string, string> = {};
    const renderer = { setStyle: (_element: unknown, name: string, value: string) => styles[name] = value };
    const directive = new ScrollRevealDirective(new ElementRef(element), renderer as any, 'server');
    return { directive, styles };
  };

  it('reveals immediately during server rendering', () => {
    const { directive, styles } = create();
    directive.distance = '20px';
    directive.duration = '1s';
    directive.ngOnInit();
    expect(styles['opacity']).toBe('1');
    expect(styles['transform']).toBe('translateY(0)');
  });

  it('sets the initial offset according to the from input', () => {
    const { directive, styles } = create();
    directive.distance = '40px';

    (directive as any).setupInitialStyles();
    expect(styles['transform']).toBe('translateY(-40px)');

    directive.from = 'bottom';
    (directive as any).setupInitialStyles();
    expect(styles['transform']).toBe('translateY(40px)');
  });
});

describe('ScrollTextRevealDirective', () => {
  const create = (html = 'Hola<br><br>Mundo') => {
    const element = document.createElement('p');
    element.innerHTML = html;
    const directive = new ScrollTextRevealDirective(new ElementRef(element), 'browser');
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);
    const rect = vi.spyOn(element, 'getBoundingClientRect');
    return { element, directive, rect };
  };

  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', () => undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('splits text into characters while preserving line breaks', () => {
    const { element, directive, rect } = create();
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);
    rect.mockReturnValue({ top: 900, height: 100, bottom: 1000 } as DOMRect);

    directive.ngOnInit();

    const chars = element.querySelectorAll<HTMLElement>('.text-reveal-char');
    expect(chars.length).toBe(9);
    expect(element.querySelectorAll('br').length).toBe(2);
    expect(chars[0].style.color).not.toBe('var(--text-primary)');
    directive.ngOnDestroy();
  });

  it('starts revealing from the first character on scroll', () => {
    const { element, directive, rect } = create();
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);
    rect.mockReturnValue({ top: 500, height: 100, bottom: 600 } as DOMRect);

    directive.ngOnInit();

    let chars = element.querySelectorAll<HTMLElement>('.text-reveal-char');
    const initialColor = chars[0].style.color;
    expect(initialColor).not.toBe('var(--text-primary)');

    scrollY.mockReturnValue(250);
    directive.updateProgress();

    chars = element.querySelectorAll<HTMLElement>('.text-reveal-char');
    expect(chars[4].style.color).toBe('var(--text-primary)');
    expect(chars[5].style.color).toBe(initialColor);

    scrollY.mockReturnValue(500);
    directive.updateProgress();

    expect(chars[8].style.color).toBe('var(--text-primary)');
    directive.ngOnDestroy();
  });

  it('does not start until the component is in view', () => {
    const { element, directive, rect } = create();
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);
    rect.mockReturnValue({ top: 1200, height: 100, bottom: 1300 } as DOMRect);

    directive.ngOnInit();

    scrollY.mockReturnValue(400);
    directive.updateProgress();

    let chars = element.querySelectorAll<HTMLElement>('.text-reveal-char');
    const initialColor = chars[0].style.color;
    expect(initialColor).not.toBe('var(--text-primary)');

    rect.mockReturnValue({ top: 700, height: 100, bottom: 800 } as DOMRect);
    scrollY.mockReturnValue(600);
    directive.updateProgress();

    chars = element.querySelectorAll<HTMLElement>('.text-reveal-char');
    expect(chars[0].style.color).toBe(initialColor);

    scrollY.mockReturnValue(850);
    directive.updateProgress();

    expect(chars[4].style.color).toBe('var(--text-primary)');
    expect(chars[5].style.color).toBe(initialColor);
    directive.ngOnDestroy();
  });

  it('does not split text during server rendering', () => {
    const element = document.createElement('p');
    element.innerHTML = 'Hola';
    const directive = new ScrollTextRevealDirective(new ElementRef(element), 'server');

    directive.ngOnInit();

    expect(element.querySelectorAll('.text-reveal-char').length).toBe(0);
  });
});
