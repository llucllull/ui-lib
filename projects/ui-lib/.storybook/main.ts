import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
    stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-onboarding', '@storybook/addon-docs'],
    framework: {
        name: '@storybook/angular-vite',
        options: {},
    },
    staticDirs: [
        // Estilos compilados: main.css se sirve en la raíz (preview-head.html lo enlaza así).
        '../src/lib/styles',
        // Assets de la librería (SVG, logos, mocks de Storybook) bajo /assets.
        { from: '../src/lib/assets', to: '/assets' },
    ],
    docs: {
        autodocs: 'tag',
    },
};

export default config;
