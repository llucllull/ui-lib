import { LinkType } from "../../../../Enum/link-type.enum";
import { HeroSectionComponent } from "./hero-section.component";
import { Meta, StoryObj } from '@storybook/angular';

export default {
  title: 'Core/Sections/HeroSection',
  component: HeroSectionComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    text: { control: 'text' },
    buttons: { control: 'object' },
  },
} as Meta<HeroSectionComponent>;

type Story = StoryObj<HeroSectionComponent>;

export const Default: Story = {
  args: {
    title: 'Título de ejemplo',
    subtitle: 'Subtítulo de ejemplo',
    text: 'Texto descriptivo de ejemplo para el Hero Section.',
    buttons: [
      { label: 'Botón 1', url: 'https://www.google.com', linkType: LinkType.External },
      { label: 'Botón 2', url: 'https://www.google.com', linkType: LinkType.External }
    ]
  }
};