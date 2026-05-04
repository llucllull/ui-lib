import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    "../**/*.mdx", 
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/angular",
    options: {}
  },
  staticDirs: ['../src/lib/styles'],
  docs: {
    autodocs: 'tag',
  },
};

export default config;
