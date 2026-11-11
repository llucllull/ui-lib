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

  it('does not apply the initial theme during server rendering', () => {
    const service = new ThemeService('server');
    expect(service.getCurrentTheme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('updates the subject without touching the DOM when set on the server', () => {
    const service = new ThemeService('server');
    service.setTheme('dark');
    expect(service.getCurrentTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('does not write storage when toggling on the server', () => {
    const setItem = vi.spyOn(localStorage, 'setItem');
    const service = new ThemeService('server');
    service.toggleTheme();
    expect(setItem).not.toHaveBeenCalled();
    expect(service.getCurrentTheme()).toBe('dark');
    setItem.mockRestore();
  });

  it('does not remove storage or reset the subject when resetting on the server', () => {
    const removeItem = vi.spyOn(localStorage, 'removeItem');
    const service = new ThemeService('server');
    service.setTheme('dark');
    service.resetTheme();
    expect(removeItem).not.toHaveBeenCalled();
    expect(service.getCurrentTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    removeItem.mockRestore();
  });

  it('ignores the saved theme during server rendering', () => {
    localStorage.setItem('theme', 'dark');
    const getItem = vi.spyOn(localStorage, 'getItem');
    const service = new ThemeService('server');
    service.loadSavedTheme();
    expect(getItem).not.toHaveBeenCalled();
    expect(service.getCurrentTheme()).toBe('light');
    getItem.mockRestore();
  });

  it('leaves the theme untouched when no theme is saved', () => {
    const service = new ThemeService('browser');
    service.loadSavedTheme();
    expect(service.getCurrentTheme()).toBe('light');
  });
});
