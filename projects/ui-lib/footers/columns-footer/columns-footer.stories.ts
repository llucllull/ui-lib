import { LinkType } from '@lluc_llull/ui-lib/enums';
import { Meta, StoryObj } from '@storybook/angular';
import { ColumnsFooterComponent } from './columns-footer.component';

export default {
    title: 'Footers/ColumnsFooter',
    component: ColumnsFooterComponent,
    tags: ['autodocs'],
    argTypes: {
        columns: { control: 'object' },
        copyright: { control: 'object' },
    },
} as Meta<ColumnsFooterComponent>;

type Story = StoryObj<ColumnsFooterComponent>;

export const Default: Story = {
    args: {
        columns: [
            {
                title: 'Servicios',
                items: [
                    {
                        label: 'Desarrollo Web',
                        url: 'https://www.google.com',
                        linkType: LinkType.External,
                    },
                    {
                        label: 'Aplicaciones Móviles',
                        url: 'https://www.google.com',
                        linkType: LinkType.External,
                    },
                    {
                        label: 'Consultoría',
                        url: 'https://www.google.com',
                        linkType: LinkType.External,
                    },
                ],
            },
            {
                title: 'Empresa',
                items: [
                    {
                        label: 'Sobre Nosotros',
                        url: 'https://www.google.com',
                        linkType: LinkType.External,
                    },
                    {
                        label: 'Nuestro Equipo',
                        url: 'https://www.google.com',
                        linkType: LinkType.External,
                    },
                    {
                        label: 'Carreras',
                        url: 'https://www.google.com',
                        linkType: LinkType.External,
                    },
                ],
            },
            {
                title: 'Recursos',
                items: [
                    { label: 'Blog', url: 'https://www.google.com', linkType: LinkType.External },
                    {
                        label: 'Documentación',
                        url: 'https://www.google.com',
                        linkType: LinkType.External,
                    },
                    {
                        label: 'Soporte',
                        url: 'https://www.google.com',
                        linkType: LinkType.External,
                    },
                ],
            },
        ],
        copyright: {
            year: '2026',
            name: 'Lluc Llull',
            rights: 'Todos los derechos reservados',
        },
    },
};
