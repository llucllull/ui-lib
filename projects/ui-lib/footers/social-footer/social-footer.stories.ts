import { Meta, StoryObj } from '@storybook/angular-vite';
import { editorialImages, external, repeatImages, tileFiles } from '../../.storybook/mocks';
import { SocialFooterComponent } from './social-footer.component';

export default {
    title: 'Footers/SocialFooter',
    component: SocialFooterComponent,
    tags: ['autodocs'],
    argTypes: {
        images: { control: 'object', description: 'Carrusel de imágenes, sin texto asociado.' },
        socials: {
            control: 'object',
            description: 'Iconos disponibles: linkedin, github, mail, arrow-up-right.',
        },
        hashtag: { control: 'text' },
    },
} as Meta<SocialFooterComponent>;

type Story = StoryObj<SocialFooterComponent>;

const socials = [
    external('LinkedIn', 'https://www.linkedin.com/in/lluc-llull/', 'linkedin'),
    external('GitHub', 'https://github.com/llucllull', 'github'),
    external('Email', 'mailto:hola@llucllull.dev', 'mail'),
];

export const Default: Story = {
    args: {
        images: editorialImages,
        socials,
        hashtag: '#llucllull',
    },
};

export const ThreeImages: Story = {
    args: {
        images: editorialImages.slice(0, 3),
        socials,
        hashtag: '#frontend',
    },
};

export const WithoutImages: Story = {
    args: {
        socials,
        hashtag: '#llucllull',
    },
};

export const OnlyImages: Story = {
    args: {
        images: repeatImages(tileFiles, 6, 'Mosaico'),
    },
};

export const Minimal: Story = {
    args: {
        socials: [socials[0]],
    },
};
