import { Meta, StoryObj } from '@storybook/angular-vite';
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

const images = Array.from({ length: 8 }, (_, index) => ({
    url: `https://picsum.photos/seed/mosaic${index + 1}/400/300.jpg`,
    alt: `Mosaico ${index + 1}`,
}));

export const Default: Story = {
    args: {
        title: 'Mosaico Parallax',
        text: 'Descubre nuestra increíble galería con efectos de paralaje y mosaico interactivo. Haz scroll para recorrer el slider diagonal.',
        images,
    },
};
