import { Meta, StoryObj } from '@storybook/angular-vite';
import { external, internal } from '../../.storybook/mocks';
import { SplitShowcaseComponent } from './split-showcase.component';

export default {
    title: 'Content/SplitShowcase',
    component: SplitShowcaseComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        subtitle: { control: 'text' },
        description: { control: 'text' },
        metas: { control: 'object', description: 'Pares etiqueta / valor bajo el título.' },
        buttons: { control: 'object' },
    },
} as Meta<SplitShowcaseComponent>;

type Story = StoryObj<SplitShowcaseComponent>;

export const Default: Story = {
    args: {
        title: 'Arima: la parte de la web que no se ve',
        subtitle: 'Datos, renderizado y despliegue. Mi trabajo dentro del equipo.',
        description:
            'Entré con una tarea clara: ordenar cómo la web pedía datos. Centralicé las llamadas a la API, migré la aplicación a SSR y revisé las pipelines para quitar fricción al despliegue.',
        metas: [
            { label: 'Categoría', value: 'Eco-hotel website' },
            { label: 'Tecnologías', value: 'Angular 17 · SSR · Signals + Standalone · REST API' },
            { label: 'Empresa', value: 'Clicktotravel' },
            { label: 'Año', value: '2025' },
        ],
        buttons: [internal('Ver proyecto', '/es/projects/arima', 'arrow-right')],
    },
};

export const WithoutButtons: Story = {
    args: {
        ...Default.args,
        buttons: undefined,
    },
};

export const ExternalLink: Story = {
    args: {
        ...Default.args,
        title: 'UI Kit',
        subtitle: 'Componentes que ya conocen el camino',
        description:
            'Una librería Angular con 35 componentes, Storybook, tests en Vitest y publicación automática en npm. La base visual que uso en mis proyectos.',
        metas: [
            { label: 'Categoría', value: 'Design system' },
            { label: 'Paquete', value: '@lluc_llull/ui-lib · v0.37.3' },
            { label: 'Año', value: '2026' },
        ],
        buttons: [
            external(
                'Ver en npm',
                'https://www.npmjs.com/package/@lluc_llull/ui-lib',
                'arrow-up-right',
            ),
        ],
    },
};

export const LongMetas: Story = {
    args: {
        ...Default.args,
        metas: [
            { label: 'Cliente', value: 'Puro Group' },
            { label: 'Tipo', value: 'Arquitectura multi-site para varios establecimientos' },
            {
                label: 'Stack',
                value: 'Angular · SSR · Multi-site · Signals + Standalone · Bitbucket Pipelines',
            },
            { label: 'Rol', value: 'Front-end developer' },
            { label: 'Periodo', value: '2024 — 2025' },
        ],
    },
};

export const TitleOnly: Story = {
    args: {
        title: 'Un bloque de solo título',
    },
};
