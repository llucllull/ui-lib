import { Meta, StoryObj } from '@storybook/angular-vite';
import { external, internal } from '../../.storybook/mocks';
import { LinksFooterComponent } from './links-footer.component';

export default {
    title: 'Footers/LinksFooter',
    component: LinksFooterComponent,
    tags: ['autodocs'],
    argTypes: {
        links: { control: 'object' },
    },
} as Meta<LinksFooterComponent>;

type Story = StoryObj<LinksFooterComponent>;

export const Default: Story = {
    args: {
        links: [
            internal('Inicio', '/es', 'home'),
            internal('Proyectos', '/es/projects'),
            internal('Sobre mí', '/es/about'),
            internal('Contacto', '/es/contact'),
            external('LinkedIn', 'https://www.linkedin.com/in/lluc-llull/', 'linkedin'),
        ],
    },
};

export const TwoLinks: Story = {
    args: {
        links: [internal('Aviso legal', '/es/legal'), internal('Privacidad', '/es/privacy')],
    },
};

export const ExternalOnly: Story = {
    args: {
        links: [
            external('GitHub', 'https://github.com/llucllull', 'github'),
            external('LinkedIn', 'https://www.linkedin.com/in/lluc-llull/', 'linkedin'),
            external('Email', 'mailto:hola@llucllull.dev', 'mail'),
        ],
    },
};

export const Empty: Story = {
    args: {
        links: [],
    },
};
