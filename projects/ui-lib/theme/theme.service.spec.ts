import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('starts in light mode and applies it to the document', () => {
    const service = new ThemeService('browser');
    expect(service.getCurrentTheme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('sets and toggles themes while persisting only toggles', () => {
    const service = new ThemeService('browser');
    service.setTheme('dark');
    expect(service.getCurrentTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBeNull();
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('loads and resets the saved theme', () => {
    const service = new ThemeService('browser');
    localStorage.setItem('theme', 'dark');
    service.loadSavedTheme();
    expect(service.getCurrentTheme()).toBe('dark');
    service.resetTheme();
    expect(service.getCurrentTheme()).toBe('light');
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('does not touch browser state during server rendering', () => {
    const service = new ThemeService('server');
    service.setTheme('dark');
    service.toggleTheme();
    service.loadSavedTheme();
    service.resetTheme();
    expect(service.getCurrentTheme()).toBe('light');
  });
});
