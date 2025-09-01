import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DynamicBackgroundComponent } from './dynamic-background.component';

const meta: Meta<DynamicBackgroundComponent> = {
  title: 'Effects/Dynamic Background',
  component: DynamicBackgroundComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DynamicBackgroundComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Un fondo animado en 3D usando **Three.js**.
        
Este componente renderiza una esfera que se deforma progresivamente con pliegues dinámicos. Perfecto para fondos creativos en portfolios o landings.`,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<DynamicBackgroundComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
  }),
};
