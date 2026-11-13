import { Meta, StoryObj } from '@storybook/angular-vite';
import { external, heroDarkImage, heroImage, internal } from '../../.storybook/mocks';
import { HeroSectionComponent } from './hero-section.component';

export default {
    title: 'Content/HeroSection',
    component: HeroSectionComponent,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'radio', options: ['text', 'image'] },
        pretitle: { control: 'text' },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        text: { control: 'text', description: 'Párrafo de apoyo bajo el subtítulo.' },
        highlight: {
            control: 'text',
            description: 'Fragmento del título que se subraya con la ola animada.',
        },
        image: { control: 'object', description: 'Solo se usa con variant="image".' },
        buttons: { control: 'object' },
    },
} as Meta<HeroSectionComponent>;

type Story = StoryObj<HeroSectionComponent>;

export const Text: Story = {
    args: {
        variant: 'text',
        pretitle: 'Front-end developer',
        title: 'Webs que se sienten rápidas',
        subtitle: 'Angular, rendimiento y detalle',
        text: 'Construyo interfaces que aguantan el día a día: contenido real, datos que cambian y usuarios que no esperan.',
        highlight: 'rápidas',
        buttons: [
            internal('Ver proyectos', '/es/projects'),
            external('Hablemos', 'mailto:hola@llucllull.dev', 'mail'),
        ],
    },
};

export const Image: Story = {
    args: {
        variant: 'image',
        pretitle: 'Proyecto destacado',
        title: 'Una portada que presenta antes de explicar',
        subtitle: 'Imagen a sangre completa',
        text: 'La variante con imagen reserva el fondo para la fotografía y deja el texto en primer plano.',
        image: heroImage,
        buttons: [internal('Abrir proyecto', '/es/projects/arima')],
    },
};

export const ImageDark: Story = {
    args: {
        ...Image.args,
        pretitle: 'Tema oscuro',
        title: 'El mismo hero con otra luz',
        image: heroDarkImage,
    },
};

export const WithHighlight: Story = {
    args: {
        ...Text.args,
        title: 'Contenido que se indexa y se lee',
        highlight: 'se lee',
        subtitle: 'SSR, semántica y datos estructurados',
        text: 'El resaltado solo aparece cuando la palabra existe exactamente en el título.',
    },
};

export const Minimal: Story = {
    args: {
        variant: 'text',
        title: 'Solo lo imprescindible',
        text: 'Sin pretítulo, sin subtítulo y sin botones.',
    },
};
