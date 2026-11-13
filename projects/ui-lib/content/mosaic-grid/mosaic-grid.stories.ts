import { Meta, StoryObj } from '@storybook/angular-vite';
import { editorialImages, repeatImages, tileFiles, tileImages } from '../../.storybook/mocks';
import { MosaicGridComponent } from './mosaic-grid.component';

export default {
    title: 'Content/MosaicGrid',
    component: MosaicGridComponent,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text', description: 'Admite HTML básico.' },
        images: {
            control: 'object',
            description: 'Se agrupan de 5 en 5: fila de 3 + fila de 2.',
        },
    },
} as Meta<MosaicGridComponent>;

type Story = StoryObj<MosaicGridComponent>;

export const Default: Story = {
    args: {
        text: 'Un mosaico editorial de <strong>cinco imágenes</strong>: tres arriba y dos abajo, con la última pequeña recortada a media altura.',
        images: editorialImages.slice(0, 5),
    },
};

export const Extended: Story = {
    args: {
        text: 'Con <strong>diez imágenes</strong> se generan dos grupos completos y el mosaico mantiene el mismo ritmo.',
        images: [...editorialImages.slice(0, 5), ...tileImages.slice(0, 5)],
    },
};

export const WithoutText: Story = {
    args: {
        images: editorialImages.slice(2, 7),
    },
};

export const SingleGroup: Story = {
    args: {
        text: 'Un único grupo con imágenes de distinta procedencia.',
        images: repeatImages(tileFiles, 5, 'Mosaico'),
    },
};

export const Empty: Story = {
    args: {
        text: 'Sin imágenes todavía. El bloque solo muestra el texto.',
        images: [],
    },
};
