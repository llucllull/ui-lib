import { Meta, StoryObj } from '@storybook/angular-vite';
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
        title: 'Notas del proyecto',
        items: [
            {
                title: 'Contexto',
                text: 'La web ya existía y funcionaba. El objetivo no era rehacerla, sino ordenar la capa de datos y reducir el tiempo de carga inicial.',
            },
            {
                title: 'Mi papel',
                text: 'Centralicé las peticiones a la API, adapté la aplicación a SSR y revisé las pipelines de despliegue. El resto del equipo siguió trabajando en paralelo.',
            },
            {
                title: 'Decisiones técnicas',
                text: 'Se mantuvo la estructura de componentes existente y se añadió un renderizado híbrido. La hidratación se limita a las zonas que realmente necesitan interactividad.',
            },
            {
                title: 'Resultado',
                text: 'Menos peticiones duplicadas, contenido indexable desde el primer render y un proceso de despliegue más corto.',
            },
        ],
    },
};

export const LongContent: Story = {
    args: {
        ...Default.args,
        title: 'Documentación extensa',
        items: [
            ...(Default.args?.items ?? []),
            {
                title: 'Qué aprendí',
                text: 'Las migraciones a SSR no se ganan en la primera pantalla. Se ganan en los estados intermedios, en las rutas que nadie prueba y en no romper lo que ya funcionaba.',
            },
            {
                title: 'Qué haría distinto',
                text: 'Medir antes de tocar. Es fácil atribuir una mejora al cambio más visible cuando el cuello de botella estaba en otro sitio.',
            },
        ],
    },
};

export const SingleItem: Story = {
    args: {
        title: 'Una sola nota',
        items: [
            {
                title: 'Recordatorio',
                text: 'Si el texto necesita tres párrafos para explicar una decisión simple, la decisión probablemente no es simple.',
            },
        ],
    },
};

export const NoTitle: Story = {
    args: {
        items: [
            {
                title: 'Bloque sin título general',
                text: 'El documento empieza directamente en el primer apartado.',
            },
        ],
    },
};
