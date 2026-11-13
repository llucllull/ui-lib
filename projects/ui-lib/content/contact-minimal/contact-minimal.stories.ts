import { Meta, StoryObj } from '@storybook/angular-vite';
import { contactImage, external, mailto } from '../../.storybook/mocks';
import { ContactMinimalComponent } from './contact-minimal.component';

export default {
    title: 'Content/ContactMinimal',
    component: ContactMinimalComponent,
    tags: ['autodocs'],
    argTypes: {
        contactsTitle: { control: 'text' },
        socialsTitle: { control: 'text' },
        contacts: { control: 'object' },
        socials: { control: 'object' },
        img: { control: 'object' },
        highlightColor: { control: 'color' },
        highlightThickness: { control: { type: 'range', min: 4, max: 60, step: 2 } },
    },
} as Meta<ContactMinimalComponent>;

type Story = StoryObj<ContactMinimalComponent>;

export const Default: Story = {
    args: {
        contactsTitle: 'Contacto',
        socialsTitle: 'En otros sitios',
        contacts: [
            mailto('hola@llucllull.dev'),
            external('+34 600 000 000', 'tel:+34600000000', 'arrow-up-right'),
        ],
        socials: [
            external('LinkedIn', 'https://www.linkedin.com/in/lluc-llull/', 'linkedin'),
            external('GitHub', 'https://github.com/llucllull', 'github'),
        ],
        img: contactImage,
    },
};

export const WithoutImage: Story = {
    args: {
        ...Default.args,
        img: undefined,
    },
};

export const SocialOnly: Story = {
    args: {
        contactsTitle: 'Escríbeme',
        contacts: [mailto('hola@llucllull.dev')],
        socialsTitle: '',
        socials: undefined,
        img: contactImage,
    },
};

export const ContactOnly: Story = {
    args: {
        contactsTitle: 'Contacto directo',
        contacts: [
            mailto('hola@llucllull.dev'),
            external('+34 600 000 000', 'tel:+34600000000', 'arrow-up-right'),
        ],
    },
};

export const CustomHighlight: Story = {
    args: {
        ...Default.args,
        highlightColor: '#22c55e',
        highlightThickness: 20,
    },
};
