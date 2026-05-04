import { Meta, StoryObj } from '@storybook/angular';
import { MosaicParallaxComponent } from './mosaic-parallax.component';

export default {
    title: 'Content/MosaicParallax',
    component: MosaicParallaxComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        text: { control: 'text' },
        images: { control: 'object' },
    },
} as Meta<MosaicParallaxComponent>;

type Story = StoryObj<MosaicParallaxComponent>;

export const Default: Story = {
    args: {
        title: 'Mosaico Parallax',
        text: 'Descubre nuestra increíble galería con efectos de paralaje y mosaico interactivo.',
        images: [
            {
                url: 'https://picsum.photos/seed/mosaic1/400/300.jpg',
                alt: 'Mosaico 1',
            },
            {
                url: 'https://picsum.photos/seed/mosaic2/400/300.jpg',
                alt: 'Mosaico 2',
            },
            {
                url: 'https://picsum.photos/seed/mosaic3/400/300.jpg',
                alt: 'Mosaico 3',
            },
            {
                url: 'https://picsum.photos/seed/mosaic4/400/300.jpg',
                alt: 'Mosaico 4',
            }
        ],
    },
};
