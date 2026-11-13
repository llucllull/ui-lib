import { Meta, StoryObj } from '@storybook/angular-vite';
import { external, internal } from '../../.storybook/mocks';
import { SectionIntroComponent } from './section-intro.component';

export default {
    title: 'Content/SectionIntro',
    component: SectionIntroComponent,
    tags: ['autodocs'],
    argTypes: {
        pretitle: { control: 'text' },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        text: { control: 'text' },
        button: { control: 'object', description: 'Renderiza un enlace con icono.' },
    },
} as Meta<SectionIntroComponent>;

type Story = StoryObj<SectionIntroComponent>;

export const Default: Story = {
    args: {
        pretitle: 'Proyectos',
        title: 'Webs que he construido o en las que he puesto buena parte del código',
        subtitle: 'Hoteles, alojamientos y proyectos propios',
        text: 'Cada proyecto tiene su problema y su solución. Aquí están los que mejor explican cómo trabajo.',
        button: internal('Ver todos los proyectos', '/es/projects', 'arrow-right'),
    },
};

export const WithExternalButton: Story = {
    args: {
        ...Default.args,
        pretitle: '',
        title: 'Hablemos',
        subtitle: 'Contacto directo',
        text: 'Si necesitas un desarrollador front-end o quieres comentar una idea, escríbeme.',
        button: external('Enviar un correo', 'mailto:hola@llucllull.dev', 'mail'),
    },
};

export const TitleOnly: Story = {
    args: {
        title: 'Solo un título de sección',
    },
};

export const TitleAndText: Story = {
    args: {
        title: 'Sin pretítulo ni botón',
        text: 'El bloque se adapta a lo que haya: cada campo es opcional.',
    },
};
