import { LinkType } from '@lluc_llull/ui-lib/enums';
import { Meta, StoryObj } from '@storybook/angular';
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
        text: { control: 'text' },
        highlight: { control: 'text' },
        image: { control: 'object' },
        buttons: { control: 'object' },
    },
} as Meta<HeroSectionComponent>;

type Story = StoryObj<HeroSectionComponent>;

export const Default: Story = {
    args: {
        variant: 'text',
        pretitle: 'Bienvenido a',
        title: 'Nuestra Plataforma',
        subtitle: 'Descubre el futuro del desarrollo web',
        text: 'Texto descriptivo de ejemplo para el Hero Section.',
        highlight: 'Innovación',
        buttons: [
            { label: 'Comenzar', url: 'https://www.google.com', linkType: LinkType.External },
            {
                label: 'Más información',
                url: 'https://www.google.com',
                linkType: LinkType.External,
            },
        ],
    },
};

export const ImageVariant: Story = {
    args: {
        variant: 'image',
        title: 'Proyecto Destacado',
        subtitle: 'Un ejemplo impresionante',
        text: 'Explora este increíble proyecto con diseño moderno y funcionalidades avanzadas.',
        image: {
            url: 'https://picsum.photos/seed/hero/1920/1080.jpg',
            alt: 'Hero background image',
        },
        buttons: [
            { label: 'Ver proyecto', url: 'https://www.google.com', linkType: LinkType.External },
        ],
    },
};
