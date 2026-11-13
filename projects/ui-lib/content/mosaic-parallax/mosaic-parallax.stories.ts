import { Meta, StoryObj } from '@storybook/angular-vite';
import { editorialImages, tileImages } from '../../.storybook/mocks';
import { MosaicParallaxComponent } from './mosaic-parallax.component';

const withTexts = editorialImages.slice(0, 6).map((img, index) => ({
    ...img,
    texts: {
        title: 2020 + index,
        text: [
            'Primer contacto con Angular y componentes reutilizables.',
            'Migración de una SPA a renderizado en servidor.',
            'Diseño de un sistema de estilos compartido.',
            'Integración de un motor de reservas.',
            'Automatización de tests y despliegues.',
            'Publicación de una librería de componentes en npm.',
        ][index],
    },
}));

export default {
    title: 'Content/MosaicParallax',
    component: MosaicParallaxComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        text: { control: 'text' },
        images: {
            control: 'object',
            description: 'La diagonal se calcula automáticamente según el número de imágenes.',
        },
    },
} as Meta<MosaicParallaxComponent>;

type Story = StoryObj<MosaicParallaxComponent>;

export const Default: Story = {
    args: {
        title: 'Trayectoria',
        text: 'Una línea de tiempo diagonal que se mueve con el scroll. En escritorio queda fijada mientras se recorre; en móvil se apila.',
        images: editorialImages.slice(0, 6),
    },
};

export const WithCaptions: Story = {
    args: {
        title: 'Con texto en cada pieza',
        text: 'Las imágenes aceptan un bloque `texts` que añade descripción, año e índice.',
        images: withTexts,
    },
};

export const ThreeImages: Story = {
    args: {
        title: 'Tres piezas',
        text: 'El recorrido se reparte entre las imágenes disponibles.',
        images: tileImages.slice(0, 3),
    },
};

export const ManyImages: Story = {
    args: {
        title: 'Ocho piezas',
        text: 'La diagonal mantiene el orden de izquierda a derecha sin romper el ritmo.',
        images: [...editorialImages.slice(0, 5), ...tileImages.slice(0, 3)],
    },
};

export const NoHeader: Story = {
    args: {
        images: editorialImages.slice(2, 7),
    },
};
