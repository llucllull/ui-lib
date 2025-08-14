import { SectionIntroComponent } from "./section-intro.component";
import { Meta, StoryObj } from '@storybook/angular';

export default {
  title: 'Core/SectionIntro',
  component: SectionIntroComponent,
  tags: ['autodocs']
} as Meta<SectionIntroComponent>;

type Story = StoryObj<SectionIntroComponent>;

export const Default: Story = {
  args: {
    pretitle: 'Pretítulo de ejemplo',
    title: 'Título de ejemplo',
    subtitle: 'Subtítulo de ejemplo',
    text: 'Texto descriptivo de ejemplo para el Section Intro.',
  }
};