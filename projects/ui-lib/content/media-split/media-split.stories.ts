import { Meta, StoryObj } from '@storybook/angular';
import { MediaSplitComponent } from './media-split.component';

export default {
    title: 'Content/MediaSplit',
    component: MediaSplitComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        text: { control: 'text' },
        images: { control: 'object' },
    },
} as Meta<MediaSplitComponent>;

type Story = StoryObj<MediaSplitComponent>;

export const Default: Story = {
    args: {
        title: 'Galería Interactiva',
        text: 'Explora nuestra colección de imágenes interactivas. Pasa el cursor sobre diferentes áreas para descubrir contenido único.',
        images: [
            {
                url: 'https://picsum.photos/seed/mediasplit1/800/600.jpg',
                alt: 'Imagen 1',
            },
            {
                url: 'https://picsum.photos/seed/mediasplit2/800/600.jpg',
                alt: 'Imagen 2',
            },
            {
                url: 'https://picsum.photos/seed/mediasplit3/800/600.jpg',
                alt: 'Imagen 3',
            },
            {
                url: 'https://picsum.photos/seed/mediasplit4/800/600.jpg',
                alt: 'Imagen 4',
            },
        ],
    },
};
