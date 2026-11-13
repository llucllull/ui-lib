import { Meta, StoryObj } from '@storybook/angular-vite';
import { editorialImages, portraitImage } from '../../.storybook/mocks';
import { MediaSplitComponent } from './media-split.component';

export default {
    title: 'Content/MediaSplit',
    component: MediaSplitComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        text: { control: 'text', description: 'Admite HTML básico.' },
        images: {
            control: 'object',
            description: 'Al pasar el ratón por la rejilla se cambia la imagen activa.',
        },
    },
} as Meta<MediaSplitComponent>;

type Story = StoryObj<MediaSplitComponent>;

export const Default: Story = {
    args: {
        title: 'Sobre mí',
        text: 'Soy Lluc Llull, desarrollador front-end en Mallorca. Llevo años construyendo interfaces con Angular, casi siempre en la parte que menos se ve: datos, rendimiento y esa base que sostiene todo lo demás.<br><br>Me gusta que el código sea fácil de leer y que la web no se caiga cuando el proyecto crece.',
        images: editorialImages.slice(0, 4),
    },
};

export const SingleImage: Story = {
    args: {
        title: 'Una sola imagen',
        text: 'La rejilla de hover se desactiva cuando solo hay una imagen.',
        images: [portraitImage],
    },
};

export const TextOnly: Story = {
    args: {
        title: 'Sin imágenes',
        text: 'El bloque funciona como una columna editorial. Útil para páginas de texto o legales.',
    },
};

export const LongText: Story = {
    args: {
        title: 'Texto largo con galería',
        text: 'La migración a SSR tenía dos objetivos: que los buscadores encontraran contenido real y que la primera pintura llegara antes.<br><br>Lo complicado no fue el SSR en sí, sino hacerlo convivir con pantallas que ya funcionaban. Ese equilibrio es la parte que no aparece en una captura de pantalla.',
        images: editorialImages.slice(3, 6),
    },
};
