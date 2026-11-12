import { Meta, StoryObj } from '@storybook/angular-vite';
import { TextMosaicHeroComponent } from './text-mosaic-hero.component';

export default {
    title: 'Content/TextMosaicHero',
    component: TextMosaicHeroComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        images: { control: 'object' },
    },
} as Meta<TextMosaicHeroComponent>;

type Story = StoryObj<TextMosaicHeroComponent>;

const images = Array.from({ length: 18 }, (_, index) => ({
    url: `https://picsum.photos/seed/text-mosaic-${index + 1}/600/750.jpg`,
    alt: `Mosaico ${index + 1}`,
}));

export const Default: Story = {
    args: {
        title: 'WHO DAAT BOY',
        images,
    },
};
