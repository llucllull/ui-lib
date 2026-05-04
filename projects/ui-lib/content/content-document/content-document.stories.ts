import { Meta, StoryObj } from '@storybook/angular';
import { ContentDocumentComponent } from './content-document.component';

export default {
    title: 'Content/ContentDocument',
    component: ContentDocumentComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        items: { control: 'object' },
    },
} as Meta<ContentDocumentComponent>;

type Story = StoryObj<ContentDocumentComponent>;

export const Default: Story = {
    args: {
        title: 'Documentación Técnica',
        items: [
            {
                title: 'Introducción',
                text: 'Bienvenido a nuestra documentación técnica. Aquí encontrarás toda la información necesaria para utilizar nuestros productos y servicios de manera eficiente.',
            },
            {
                title: 'Guía de Instalación',
                text: 'Sigue nuestros pasos detallados para instalar y configurar el software en tu entorno. Compatible con Windows, macOS y Linux.',
            },
            {
                title: 'Configuración Inicial',
                text: 'Aprende a realizar la configuración inicial del sistema, incluyendo parámetros esenciales y personalizaciones recomendadas.',
            },
            {
                title: 'API Reference',
                text: 'Documentación completa de nuestra API con ejemplos de uso, endpoints disponibles y formatos de respuesta.',
            },
            {
                title: 'Mejores Prácticas',
                text: 'Conoce las mejores prácticas y recomendaciones para optimizar el rendimiento y seguridad de tus implementaciones.',
            },
            {
                title: 'Solución de Problemas',
                text: 'Guía de troubleshooting para resolver los problemas más comunes. Preguntas frecuentes y soluciones rápidas.',
            },
        ],
    },
};
