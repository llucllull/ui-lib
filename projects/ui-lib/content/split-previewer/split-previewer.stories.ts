import { Meta, StoryObj } from '@storybook/angular-vite';
import { editorialImages, heroImage, internal } from '../../.storybook/mocks';
import { SplitPreviewerComponent } from './split-previewer.component';

export default {
    title: 'Content/SplitPreviewer',
    component: SplitPreviewerComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        direction: {
            control: 'radio',
            options: ['left', 'right'],
            description: 'Coloca la lista de proyectos a un lado y la previsualización al otro.',
        },
        items: {
            control: 'object',
            description: 'Al pasar el ratón por cada fila cambia la imagen.',
        },
        imageDefault: { control: 'object', description: 'Imagen visible cuando no hay hover.' },
        highlightColor: { control: 'color' },
        highlightThickness: { control: { type: 'range', min: 4, max: 60, step: 2 } },
    },
} as Meta<SplitPreviewerComponent>;

const items = [
    {
        title: 'Arima Hotel',
        type: 'Hotel web',
        description:
            'Capa de datos, migración a SSR y rendimiento dentro del equipo de Clicktotravel.',
        tags: ['Angular', 'SSR', 'REST API'],
        link: internal('Ver proyecto', '/es/projects/arima', 'arrow-up-right'),
        image: editorialImages[0],
    },
    {
        title: 'Blanco Hotel Formentera',
        type: 'Booking engine',
        description:
            'Integración de reservas, estados intermedios y una interfaz que tenía que parecer sencilla.',
        tags: ['Angular', 'SSR', 'Booking'],
        link: internal('Ver proyecto', '/es/projects/blanco', 'arrow-up-right'),
        image: editorialImages[1],
    },
    {
        title: 'UI Kit',
        type: 'Design system',
        description:
            '35 componentes Angular, Storybook, tests en Vitest y publicación automática en npm.',
        tags: ['Angular 22', 'Storybook', 'npm'],
        link: internal('Ver proyecto', '/es/projects/ui-kit', 'arrow-up-right'),
        image: editorialImages[2],
    },
    {
        title: 'Lluc Llull',
        type: 'Portfolio',
        description:
            'Contenido en JSON, SSG, tres idiomas y despliegue en Vercel con assets en Cloudflare R2.',
        tags: ['Angular', 'SSG', 'Vercel'],
        link: internal('Ver proyecto', '/es/projects/lluc-llull', 'arrow-up-right'),
        image: editorialImages[3],
    },
];

type Story = StoryObj<SplitPreviewerComponent>;

export const Default: Story = {
    args: {
        title: 'Proyectos',
        direction: 'right',
        imageDefault: heroImage,
        items,
    },
};

export const Left: Story = {
    args: {
        ...Default.args,
        direction: 'left',
    },
};

export const TwoItems: Story = {
    args: {
        title: 'Selección corta',
        direction: 'right',
        imageDefault: editorialImages[4],
        items: items.slice(0, 2),
    },
};

export const CustomHighlight: Story = {
    args: {
        ...Default.args,
        highlightColor: '#f59e0b',
        highlightThickness: 24,
    },
};
