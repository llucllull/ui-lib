# UiLib

An Angular UI component library for building modular, accessible, and reusable web interfaces. This project is based on Angular 19 and is designed to be published as an npm package from `projects/ui-lib`.

## What’s inside

- Ready-to-use UI components: hero section, contact minimal, media split, stacked rows, and more.
- Utility directives: link type detection, highlight, scroll reveal, and responsive helpers.
- Shared services for theming, CDN mapping, modal handling, slider support, and screen-size utilities.
- Secondary entry points so consumers can import only the modules they need.

## Main structure

- `projects/ui-lib/`: main Angular library source and build configuration.
- `projects/ui-lib/src/public-api.ts`: main public entry point for the package.
- `projects/ui-lib/ng-package.json`: primary library packaging config.
- `projects/ui-lib/package.json`: npm package metadata, peer dependencies, and publish settings.

## Secondary entry points

Each of these directories is a secondary entry point of the package, with its own `ng-package.json` and `index.ts` export surface.

- `@lluc_llull/ui-lib/content` — UI content components and Storybook stories.
- `@lluc_llull/ui-lib/directives` — reusable Angular directives.
- `@lluc_llull/ui-lib/effects` — animated and dynamic background effects.
- `@lluc_llull/ui-lib/enums` — shared enums and constant types.
- `@lluc_llull/ui-lib/feedback` — feedback and error UI elements.
- `@lluc_llull/ui-lib/footers` — footer layouts and variations.
- `@lluc_llull/ui-lib/forms` — form components, layouts, and validators.
- `@lluc_llull/ui-lib/headers` — header and navigation components.
- `@lluc_llull/ui-lib/interfaces` — typed interfaces and data models.
- `@lluc_llull/ui-lib/mapper` — CDN mapper and component mapping services.
- `@lluc_llull/ui-lib/modals` — modal/dialog support.
- `@lluc_llull/ui-lib/screen-sizer` — responsive screen-size utilities.
- `@lluc_llull/ui-lib/shared` — shared UI elements and icon components.
- `@lluc_llull/ui-lib/sliders` — Swiper-based slider directives/components.
- `@lluc_llull/ui-lib/theme` — theming, style services, and theme utilities.
- `@lluc_llull/ui-lib/utils` — generic utility functions and helpers.

## Development

```bash
npm start
```

This runs the Angular application locally. The library code is in `projects/ui-lib`, and `ng serve` will reload on changes.

## Build

```bash
npm run build
```

Builds the project and creates the library package artifacts.

## Testing

- Unit tests:

```bash
npm test
```

- End-to-end tests:

```bash
ng e2e
```

## Usage

Install the library:

```bash
npm install @lluc_llull/ui-lib
```

### Architectural overview

This library is architected as a modular Angular package with:

- **Secondary entry points**: Each module (content, directives, theme, etc.) is a separate entry point, enabling tree-shaking and selective imports to reduce bundle size.
- **Standalone components**: All components are standalone, making them easy to import without NgModules.
- **Injectable services**: Shared services like `MapperService` and `ThemeService` are provided in root, handling dynamic component mapping and theming.
- **Directive-based utilities**: Reusable directives for common behaviors like scroll reveal and highlighting.
- **Type-safe interfaces**: Strongly typed interfaces for component props and data models.

### Basic component usage

Import and use a component directly:

```ts
import { Component } from '@angular/core';
import { CategoryProgressComponent } from '@lluc_llull/ui-lib/content';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CategoryProgressComponent],
    template: `
        <lib-category-progress
            [pretitle]="'Progress Overview'"
            [title]="'Category Achievements'"
            [categories]="progressData"
        ></lib-category-progress>
    `,
})
export class AppComponent {
    progressData = [
        {
            title: 'Skills',
            items: [
                { label: 'JavaScript', value: 85 },
                { label: 'TypeScript', value: 90 },
            ],
        },
        {
            title: 'Tools',
            items: [
                { label: 'Angular', value: 80 },
                { label: 'RxJS', value: 75 },
            ],
        },
    ];
}
```

### Using the mapper service

The `MapperService` enables dynamic component rendering from CMS data or APIs. It maps raw data to typed component props:

```ts
import { Component, inject } from '@angular/core';
import { MapperService } from '@lluc_llull/ui-lib/mapper';
import { BodyComponent } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'app-dynamic-page',
    standalone: true,
    template: `
        <ng-container *ngFor="let component of mappedComponents">
            <lib-category-progress
                *ngIf="component.name === 'categoryprogress'"
                [pretitle]="component.props.pretitle"
                [title]="component.props.title"
                [categories]="component.props.categories"
            ></lib-category-progress>
        </ng-container>
    `,
})
export class DynamicPageComponent {
    private mapper = inject(MapperService);
    mappedComponents: BodyComponent<any>[] = [];

    ngOnInit() {
        // Raw data from CMS/API
        const rawBody = [
            {
                name: 'CategoryProgress',
                order: 1,
                props: {
                    pretitle: 'Our Progress',
                    title: 'Key Metrics',
                    categories: [
                        {
                            title: 'Development',
                            items: [{ label: 'Frontend', value: 95 }],
                        },
                    ],
                },
            },
        ];

        this.mappedComponents = this.mapper.mapComponents(rawBody);
    }
}
```

### Theming integration

Use the `ThemeService` for dynamic theming:

```ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '@lluc_llull/ui-lib/theme';

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
        <button (click)="themeService.toggleTheme()">
            Toggle to {{ themeService.getCurrentTheme() === 'light' ? 'dark' : 'light' }} mode
        </button>
    `,
})
export class HeaderComponent {
    themeService = inject(ThemeService);
}
```

## Integration

1. **Build the library**:

    ```bash
    npm run build
    ```

2. **Install locally for testing**:

    ```bash
    npm install ./dist/ui-lib
    ```

3. **Configure providers** (if needed for mapper):

    ```ts
    import { CDN_BASE_URL } from '@lluc_llull/ui-lib/mapper';

    bootstrapApplication(AppComponent, {
        providers: [{ provide: CDN_BASE_URL, useValue: 'https://your-cdn.com' }],
    });
    ```

4. **Import selectively** to optimize bundle:
    ```ts
    // Only import what you need
    import { CategoryProgressComponent } from '@lluc_llull/ui-lib/content';
    import { ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';
    import { ThemeService } from '@lluc_llull/ui-lib/theme';
    ```

## What problem does it solve?

- **Modular architecture**: Secondary entry points allow importing only needed modules, reducing bundle size and improving performance.
- **Dynamic rendering**: The mapper service enables CMS-driven, type-safe component instantiation from API data.
- **Consistent theming**: Centralized theme management ensures visual coherence across applications.
- **Reusable patterns**: Pre-built components and directives accelerate development of common UI patterns like progress bars, modals, and responsive layouts.
- **Type safety**: Strongly typed interfaces prevent runtime errors and improve developer experience.

## Publishing

The package is configured in `projects/ui-lib/ng-package.json`, and the public API is defined in `projects/ui-lib/src/public-api.ts`. Secondary entry points are managed by the subfolder `ng-package.json` files.

## Quick notes

- This repository targets Angular 19 and uses `@angular/*` 19.x packages.
- The package name is `@lluc_llull/ui-lib` as defined in `projects/ui-lib/package.json`.
- See `projects/ui-lib/documentation.json` and `projects/ui-lib/CHANGELOG.md` for extra documentation and release history.
