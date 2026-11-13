import { Meta, StoryObj } from '@storybook/angular-vite';
import { external, internal } from '../../.storybook/mocks';
import { ColumnsFooterComponent } from './columns-footer.component';

export default {
    title: 'Footers/ColumnsFooter',
    component: ColumnsFooterComponent,
    tags: ['autodocs'],
    argTypes: {
        columns: {
            control: 'object',
            description: 'Hasta tres columnas: navegación, enlaces y contacto.',
        },
        copyright: { control: 'object' },
    },
} as Meta<ColumnsFooterComponent>;

type Story = StoryObj<ColumnsFooterComponent>;

const columns = [
    {
        title: 'Navegación',
        items: [
            internal('Inicio', '/es', 'home'),
            internal('Proyectos', '/es/projects', 'arrow-right'),
            internal('Sobre mí', '/es/about', 'arrow-right'),
            internal('Contacto', '/es/contact', 'arrow-right'),
        ],
    },
    {
        title: 'Proyectos',
        items: [
            internal('Arima Hotel', '/es/projects/arima'),
            internal('Blanco Hotel Formentera', '/es/projects/blanco'),
            internal('Puro Group', '/es/projects/puro-group'),
            internal('UI Kit', '/es/projects/ui-kit'),
        ],
    },
    {
        title: 'En otros sitios',
        items: [
            external('LinkedIn', 'https://www.linkedin.com/in/lluc-llull/', 'linkedin'),
            external('GitHub', 'https://github.com/llucllull', 'github'),
            external('Email', 'mailto:hola@llucllull.dev', 'mail'),
            internal('Privacidad', '/es/privacy'),
        ],
    },
];

const copyright = {
    year: '2026',
    name: 'Lluc Llull',
    rights: 'Todos los derechos reservados',
};

export const Default: Story = {
    args: { columns, copyright },
};

export const TwoColumns: Story = {
    args: {
        columns: columns.slice(0, 2),
        copyright,
    },
};

export const OneColumn: Story = {
    args: {
        columns: [columns[0]],
        copyright,
    },
};

export const WithoutCopyright: Story = {
    args: {
        columns: columns.slice(0, 2),
    },
};
