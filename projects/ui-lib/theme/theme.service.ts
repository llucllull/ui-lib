import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private currentThemeSubject = new BehaviorSubject<Theme>('light');
    public currentTheme$ = this.currentThemeSubject.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        // Aplicar tema por defecto al inicio
        if (isPlatformBrowser(this.platformId)) {
            this.applyTheme('light');
        }
    }

    public getCurrentTheme(): Theme {
        return this.currentThemeSubject.value;
    }

    public setTheme(theme: Theme): void {
        this.currentThemeSubject.next(theme);
        this.applyTheme(theme);
        // NO guardar automáticamente en localStorage - solo cuando el usuario hace toggle
    }

    public toggleTheme(): void {
        const currentTheme = this.getCurrentTheme();
        const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';

        // Guardar en localStorage solo cuando el usuario hace toggle
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('theme', newTheme);
        }

        this.setTheme(newTheme);
    }

    public resetTheme(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('theme');
            this.currentThemeSubject.next('light');
            this.applyTheme('light');
        }
    }

    // Método para cargar el tema guardado (opcional)
    public loadSavedTheme(): void {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme) {
                this.setTheme(savedTheme);
            }
        }
    }

    private applyTheme(theme: Theme): void {
        // Solo aplicar en el navegador
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const root = document.documentElement;

        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }
    }
}
