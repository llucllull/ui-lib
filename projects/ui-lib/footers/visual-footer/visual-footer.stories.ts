import { Meta, StoryObj } from '@storybook/angular-vite';
import { external, footerImage, mailto, tel } from '../../.storybook/mocks';
import { VisualFooterComponent } from './visual-footer.component';

export default {
    title: 'Footers/VisualFooter',
    component: VisualFooterComponent,
    tags: ['autodocs'],
    argTypes: {
        contactTitle: { control: 'text' },
        contactPhone: { control: 'object' },
        contactEmail: { control: 'object' },
        addressTitle: { control: 'text' },
        address: { control: 'object' },
        socialsTitle: { control: 'text' },
        socials: { control: 'object' },
        image: { control: 'object' },
    },
} as Meta<VisualFooterComponent>;

type Story = StoryObj<VisualFooterComponent>;

const socials = [
    external('LinkedIn', 'https://www.linkedin.com/in/lluc-llull/', 'linkedin'),
    external('GitHub', 'https://github.com/llucllull', 'github'),
    external('Email', 'mailto:hola@llucllull.dev', 'mail'),
];

export const Default: Story = {
    args: {
        contactTitle: 'Contacto',
        contactPhone: tel('+34 600 000 000'),
        contactEmail: mailto('hola@llucllull.dev'),
        addressTitle: 'Dónde estoy',
        address: {
            address: 'Sant Llorenç des Cardassar',
            cp: '07530',
            city: 'Mallorca',
            province: 'Illes Balears',
            country: 'España',
        },
        socialsTitle: 'En otros sitios',
        socials,
        image: footerImage,
    },
};

export const WithoutImage: Story = {
    args: {
        ...Default.args,
        image: undefined,
    },
};

export const WithoutSocials: Story = {
    args: {
        ...Default.args,
        socialsTitle: '',
        socials: undefined,
    },
};

export const ContactOnly: Story = {
    args: {
        contactTitle: 'Hablemos',
        contactPhone: tel('+34 600 000 000'),
        contactEmail: mailto('hola@llucllull.dev'),
        image: footerImage,
    },
};
