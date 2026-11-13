import { Meta, StoryObj } from '@storybook/angular-vite';
import { landscapeImage, wideImage } from '../../.storybook/mocks';
import { MediaIntroComponent } from './media-intro.component';

export default {
    title: 'Content/MediaIntro',
    component: MediaIntroComponent,
    tags: ['autodocs'],
    argTypes: {
        highlightedText: { control: 'text', description: 'Titular grande. Admite HTML.' },
        secondaryText: { control: 'text', description: 'Párrafo de apoyo. Admite HTML.' },
        direction: { control: 'radio', options: ['left', 'right'] },
        media: { control: 'object' },
    },
} as Meta<MediaIntroComponent>;

type Story = StoryObj<MediaIntroComponent>;

export const Right: Story = {
    args: {
        direction: 'right',
        highlightedText: 'La parte de la web que <em>no se ve</em>',
        secondaryText:
            'Datos, renderizado y despliegue. El trabajo que hace que la interfaz parezca sencilla suele estar debajo, en decisiones que el usuario nunca llega a ver.',
        media: wideImage,
    },
};

export const Left: Story = {
    args: {
        ...Right.args,
        direction: 'left',
        highlightedText: 'Menos peso, <em>más margen</em>',
        secondaryText:
            'Una web sostenible no va solo de colores verdes: también de no cargar de más y de no repetir trabajo.',
        media: landscapeImage,
    },
};

export const TextOnly: Story = {
    args: {
        direction: 'right',
        highlightedText: 'Un intro sin imagen también sostiene una sección.',
        secondaryText: 'Útil cuando el texto es el contenido principal.',
    },
};

export const HighlightOnly: Story = {
    args: {
        direction: 'left',
        highlightedText: 'Solo el titular, sin párrafo secundario ni media.',
    },
};
