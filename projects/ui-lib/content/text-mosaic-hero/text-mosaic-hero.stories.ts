import { Meta, StoryObj } from '@storybook/angular-vite';
import { editorialFiles, repeatImages, tileFiles } from '../../.storybook/mocks';
import { TextMosaicHeroComponent } from './text-mosaic-hero.component';

export default {
    title: 'Content/TextMosaicHero',
    component: TextMosaicHeroComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        images: {
            control: 'object',
            description: 'Se muestran como máximo 18 piezas; el resto se ignora.',
        },
    },
} as Meta<TextMosaicHeroComponent>;

const files = [...editorialFiles, ...tileFiles];

type Story = StoryObj<TextMosaicHeroComponent>;

export const Default: Story = {
    args: {
        title: 'LLUC LLULL',
        images: repeatImages(files, 18, 'Mosaico'),
    },
};

export const SixTiles: Story = {
    args: {
        title: 'FRONT-END',
        images: repeatImages(files, 6, 'Mosaico'),
    },
};

export const LongTitle: Story = {
    args: {
        title: 'FRONT-END DEVELOPER',
        images: repeatImages(files, 12, 'Mosaico'),
    },
};

export const SingleTile: Story = {
    args: {
        title: 'ONE',
        images: repeatImages(files, 1, 'Mosaico'),
    },
};
