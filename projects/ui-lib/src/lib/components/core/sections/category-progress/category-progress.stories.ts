import { CategoryProgressComponent } from "./category-progress.component";
import { Meta, StoryObj } from '@storybook/angular';

export default {
  title: 'Core/Sections/CategoryProgress',
  component: CategoryProgressComponent,
  tags: ['autodocs']
} as Meta<CategoryProgressComponent>;

type Story = StoryObj<CategoryProgressComponent>;

export const Default: Story = {
  args: {
    pretitle: 'Pretítulo de ejemplo',
    title: 'Título de ejemplo',
    categories: [
      { title: 'Categoria 1', items: 
        [
          { label: 'Item 1', value: 75 },
          { label: 'Item 2', value: 35 },
        ]
      },
      { title: 'Categoria 2', items: 
        [
          { label: 'Item 1', value: 15 },
          { label: 'Item 2', value: 85 },
        ]
      }
    ]
  }
};