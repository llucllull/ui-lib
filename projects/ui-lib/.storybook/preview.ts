import { componentWrapperDecorator, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  decorators: [
    // Envolvemos todas las historias en el contenedor de rejilla
    componentWrapperDecorator((story: any) => `
      <main class="main-grid">
        ${story}
      </main>
    `),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      inlineStories: false, // Forzar iframe en Docs también
    },
    viewport: {
      defaultViewport: 'desktop',
      viewports: {
        mobile: {
          name: 'Mobile (375x667)',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet (768x1024)',
          styles: {
            width: '768px',
            height: '1024px',
          },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop (1440x900)',
          styles: {
            width: '1440px',
            height: '900px',
          },
          type: 'desktop',
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
