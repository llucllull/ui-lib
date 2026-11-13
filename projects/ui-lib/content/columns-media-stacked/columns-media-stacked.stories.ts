import { Meta, StoryObj } from '@storybook/angular-vite';
import { wideImage } from '../../.storybook/mocks';
import { ColumnsMediaStackedComponent } from './columns-media-stacked.component';

export default {
    title: 'Content/ColumnsMediaStacked',
    component: ColumnsMediaStackedComponent,
    tags: ['autodocs'],
    argTypes: {
        leftColumn: { control: 'text', description: 'Admite HTML básico (innerHTML).' },
        rightColumn: { control: 'text', description: 'Admite HTML básico (innerHTML).' },
        direction: { control: 'radio', options: ['left', 'right'] },
        image: { control: 'object' },
    },
} as Meta<ColumnsMediaStackedComponent>;

type Story = StoryObj<ColumnsMediaStackedComponent>;

export const Right: Story = {
    args: {
        direction: 'right',
        leftColumn:
            'El contenido se lee mejor cuando la estructura no compite con él. Dos columnas, aire y una imagen que cierra la idea.',
        rightColumn:
            'La dirección ajusta dónde cae la imagen y cómo se reparten las columnas. En este caso, el bloque visual se desplaza a la derecha.',
        image: wideImage,
    },
};

export const Left: Story = {
    args: {
        ...Right.args,
        direction: 'left',
    },
};

export const WithFormatting: Story = {
    args: {
        direction: 'right',
        leftColumn:
            '<strong>Datos antes que decoración.</strong><br>La capa de peticiones se centraliza para que la interfaz no repita trabajo.',
        rightColumn:
            '<strong>SSR con criterio.</strong><br>Renderizar en servidor sirve para indexar y para que la primera pintura llegue antes. Nada más.',
        image: wideImage,
    },
};

export const WithoutImage: Story = {
    args: {
        direction: 'left',
        leftColumn: 'Un bloque de dos columnas también funciona sin imagen.',
        rightColumn: 'Útil para notas, conclusiones o cierres de sección.',
    },
};
