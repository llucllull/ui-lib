import { ElementRef, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderScrollDirective } from './header-scroll.directive';
import { HighlightDirective } from './highlight.directive';
import { LinkTypeDirective } from './link-type.directive';
import { ScrollRevealDirective } from './scroll-reveal.directive';
import { ScrollTextRevealDirective } from './scroll-text-reveal.directive';

describe('HeaderScrollDirective', () => {
  const coloredElement = (color: string) => {
    const element = document.createElement('div');
    element.style.backgroundColor = color;
    return element;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: new ElementRef(header) },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    const directive = TestBed.runInInjectionContext(() => new HeaderScrollDirective());
    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 200,
      height: 100,
    } as DOMRect);

    return { header, directive };
  };

  it('updates the scrolled state according to the threshold', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: new ElementRef(document.createElement('header')) },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    const directive = TestBed.runInInjectionContext(() => new HeaderScrollDirective());
    directive.scrollThreshold = 60;
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(61);
    directive.onScroll();
    expect(directive.isScrolled).toBe(true);
    scrollY.mockReturnValue(60);
    directive.onScroll();
    expect(directive.isScrolled).toBe(false);
  });

  it('detects light backgrounds behind the header', () => {
    const { directive } = createHeader();
    const fromPoint = vi.fn(() => [coloredElement('rgb(255, 255, 255)')]);
    (document as any).elementsFromPoint = fromPoint;

    directive.onScroll();

    expect(fromPoint).toHaveBeenCalledWith(100, 99);
    expect(directive.isOverLight).toBe(true);
    expect(directive.isOverDark).toBe(false);

    delete (document as any).elementsFromPoint;
  });

  it('detects dark backgrounds behind the header', () => {
    const { directive } = createHeader();
    (document as any).elementsFromPoint = vi.fn(() => [coloredElement('rgb(10, 10, 10)')]);

    directive.onScroll();

    expect(directive.isOverDark).toBe(true);
    expect(directive.isOverLight).toBe(false);

    delete (document as any).elementsFromPoint;
  });

  it('ignores elements contained inside the header', () => {
    const { directive, header } = createHeader();
    const child = document.createElement('span');
    header.appendChild(child);
    (document as any).elementsFromPoint = vi.fn(() => [child, coloredElement('rgb(10, 10, 10)')]);

    directive.onResize();

    expect(directive.isOverDark).toBe(true);

    header.innerHTML = '';
    delete (document as any).elementsFromPoint;
  });

  it('keeps the tone unchanged when every background is transparent', () => {
    const { directive } = createHeader();
    (document as any).elementsFromPoint = vi.fn(() => [coloredElement('rgba(0, 0, 0, 0)')]);

    directive.onScroll();

    expect(directive.isOverLight).toBe(false);
    expect(directive.isOverDark).toBe(false);

    delete (document as any).elementsFromPoint;
  });

  it('skips tone detection for hidden headers', () => {
    const { directive, header } = createHeader();
    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 0,
      left: 0,
      right: 200,
      height: 0,
    } as DOMRect);
    const fromPoint = vi.fn(() => []);
    (document as any).elementsFromPoint = fromPoint;

    directive.ngAfterViewInit();

    expect(fromPoint).not.toHaveBeenCalled();

    delete (document as any).elementsFromPoint;
  });

  it('does nothing outside the browser', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: new ElementRef(document.createElement('header')) },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    const directive = TestBed.runInInjectionContext(() => new HeaderScrollDirective());
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(999);

    directive.ngAfterViewInit();
    directive.onScroll();

    expect(directive.isScrolled).toBe(false);
    scrollY.mockRestore();
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

  it('supports horizontal offsets and delays', () => {
    const { directive, styles } = create();
    directive.distance = '40px';
    directive.delay = 120;
    directive.from = 'left';

    (directive as any).setupInitialStyles();
    expect(styles['transform']).toBe('translateX(-40px)');
    expect(styles['transition']).toContain('120ms');

    (directive as any).reveal();
    expect(styles['transform']).toBe('translateX(0)');

    directive.from = 'right';
    (directive as any).setupInitialStyles();
    expect(styles['transform']).toBe('translateX(40px)');
  });

  const createBrowser = () => {
    const element = document.createElement('div');
    const styles: Record<string, string> = {};
    const renderer = {
      setStyle: (_element: unknown, name: string, value: string) => (styles[name] = value),
    };
    return { element, styles, renderer };
  };

  it('observes the element and reveals it when it intersects', () => {
    const { element, styles, renderer } = createBrowser();

    let observerCallback: IntersectionObserverCallback | undefined;
    const observer: IntersectionObserver = {
      root: null,
      rootMargin: '0px',
      scrollMargin: '0px',
      thresholds: [],
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: vi.fn(() => []),
    };
    const observerConstructor = vi.fn(function (callback: IntersectionObserverCallback) {
      observerCallback = callback;
      return observer;
    });
    (globalThis as any).IntersectionObserver = observerConstructor;

    const directive = new ScrollRevealDirective(
      new ElementRef(element),
      renderer as any,
      'browser',
    );
    directive.threshold = 0.5;
    directive.rootMargin = '10px';
    directive.ngOnInit();

    expect(observerConstructor).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.5,
      rootMargin: '10px',
    });
    expect(observer.observe).toHaveBeenCalledWith(element);

    observerCallback!([{ isIntersecting: true } as IntersectionObserverEntry], observer);

    expect(styles['opacity']).toBe('1');
    expect(styles['transform']).toBe('translateY(0)');
    expect(observer.unobserve).toHaveBeenCalledWith(element);

    delete (globalThis as any).IntersectionObserver;
  });

  it('keeps observing elements that have not intersected yet', () => {
    const { element, styles, renderer } = createBrowser();

    let observerCallback: IntersectionObserverCallback | undefined;
    const observer: IntersectionObserver = {
      root: null,
      rootMargin: '0px',
      scrollMargin: '0px',
      thresholds: [],
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: vi.fn(() => []),
    };
    (globalThis as any).IntersectionObserver = vi.fn(function (callback: IntersectionObserverCallback) {
      observerCallback = callback;
      return observer;
    });

    const directive = new ScrollRevealDirective(
      new ElementRef(element),
      renderer as any,
      'browser',
    );
    directive.ngOnInit();

    observerCallback!([{ isIntersecting: false } as IntersectionObserverEntry], observer);

    expect(styles['opacity']).toBe('0');
    expect(observer.unobserve).not.toHaveBeenCalled();

    delete (globalThis as any).IntersectionObserver;
  });

  it('reveals immediately with reduced motion and no transition', () => {
    const { element, styles, renderer } = createBrowser();
    const originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });

    const directive = new ScrollRevealDirective(
      new ElementRef(element),
      renderer as any,
      'browser',
    );
    directive.ngOnInit();

    expect(styles['transition']).toBe('none');
    expect(styles['opacity']).toBe('1');
    if (originalMatchMedia) {
      Object.defineProperty(window, 'matchMedia', originalMatchMedia);
    } else {
      delete (window as any).matchMedia;
    }
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

  it('reveals characters when the window scrolls', () => {
    const { element, directive, rect } = create();
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);
    rect.mockReturnValue({ top: 500, height: 100, bottom: 600 } as DOMRect);

    directive.ngOnInit();

    scrollY.mockReturnValue(500);
    window.dispatchEvent(new Event('scroll'));

    const chars = element.querySelectorAll<HTMLElement>('.text-reveal-char');
    expect(chars[8].style.color).toBe('var(--text-primary)');
    directive.ngOnDestroy();
  });

  it('dims characters again when scrolling back', () => {
    const { element, directive, rect } = create();
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);
    rect.mockReturnValue({ top: 500, height: 100, bottom: 600 } as DOMRect);

    directive.ngOnInit();

    scrollY.mockReturnValue(500);
    directive.updateProgress();

    const chars = element.querySelectorAll<HTMLElement>('.text-reveal-char');
    expect(chars[8].style.color).toBe('var(--text-primary)');

    scrollY.mockReturnValue(250);
    directive.updateProgress();

    expect(chars[4].style.color).toBe('var(--text-primary)');
    expect(chars[5].style.color).toBe('var(--text-primary-60)');
    directive.ngOnDestroy();
  });

  it('cancels pending frames on destroy', () => {
    const { element, directive } = create();
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);

    directive.ngOnInit();

    (directive as any).frame = 7;
    const cancelSpy = vi.fn();
    vi.stubGlobal('cancelAnimationFrame', cancelSpy);

    directive.ngOnDestroy();

    expect(cancelSpy).toHaveBeenCalledWith(7);
  });
});
