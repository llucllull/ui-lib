import { Meta, StoryObj } from '@storybook/angular';
import { StackedRowsComponent } from './stacked-rows.component';

export default {
    title: 'Content/StackedRows',
    component: StackedRowsComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        text: { control: 'text' },
        items: { control: 'object' },
    },
} as Meta<StackedRowsComponent>;

type Story = StoryObj<StackedRowsComponent>;

export const Default: Story = {
    args: {
        title: 'Servicios Destacados',
        text: 'Descubre nuestra gama completa de servicios diseñados para impulsar tu negocio.',
        items: [
            {
                title: 'Desarrollo Web a Medida',
                text: 'Creamos sitios web personalizados que se adaptan perfectamente a las necesidades de tu empresa, con diseño moderno y funcionalidades avanzadas.',
            },
            {
                title: 'Aplicaciones Móviles',
                text: 'Desarrollamos apps nativas y progresivas para iOS y Android, ofreciendo la mejor experiencia de usuario en cualquier dispositivo.',
            },
            {
                title: 'Consultoría Tecnológica',
                text: 'Asesoramiento experto para transformar digitalmente tu negocio, optimizando procesos e implementando las mejores tecnologías.',
            },
            {
                title: 'Marketing Digital',
                text: 'Estrategias integrales de marketing digital para aumentar tu visibilidad online y llegar a más clientes potenciales.',
            },
            {
                title: 'Soporte Técnico',
                text: 'Mantenimiento continuo y soporte técnico especializado para garantizar el correcto funcionamiento de tus sistemas.',
            },
        ],
    },
};
