import { Meta, StoryObj } from '@storybook/angular-vite';
import { external, internal } from '../../.storybook/mocks';
import { LegalFooterComponent } from './legal-footer.component';

export default {
    title: 'Footers/LegalFooter',
    component: LegalFooterComponent,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'radio', options: ['simple', 'extended'] },
        brand: { control: 'text' },
        year: { control: 'number' },
        credits: { control: 'text' },
        links: { control: 'object', description: 'Solo se renderizan en la variante extended.' },
    },
} as Meta<LegalFooterComponent>;

type Story = StoryObj<LegalFooterComponent>;

const links = [
    internal('Aviso legal', '/es/legal'),
    internal('Privacidad', '/es/privacy'),
    external('Cookies', 'https://example.com/cookies'),
    external('LinkedIn', 'https://www.linkedin.com/in/lluc-llull/', 'linkedin'),
];

export const Simple: Story = {
    args: {
        variant: 'simple',
        brand: 'Lluc Llull',
        year: 2026,
        credits: 'Diseñado y desarrollado por Lluc Llull',
    },
};

export const Extended: Story = {
    args: {
        variant: 'extended',
        brand: 'Lluc Llull',
        year: 2026,
        credits: 'Hecho con Angular y demasiado café',
        links,
    },
};

export const ExtendedWithoutLinks: Story = {
    args: {
        variant: 'extended',
        brand: 'Lluc Llull',
        year: 2026,
        credits: 'Todos los derechos reservados',
    },
};

export const LongBrand: Story = {
    args: {
        variant: 'simple',
        brand: 'Lluc Llull · Front-end developer',
        year: 2026,
        credits: 'Mallorca, Illes Balears',
    },
};
