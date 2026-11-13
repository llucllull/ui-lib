import { Meta, StoryObj } from '@storybook/angular-vite';
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
        title: 'Cómo trabajo',
        text: 'Cuatro ideas que se repiten en casi todos los proyectos, independientemente del cliente o del stack.',
        items: [
            {
                title: 'Entender el flujo antes de tocar la interfaz',
                text: 'Si los datos no están claros, la pantalla acaba llena de parches. Prefiero dedicar tiempo a la capa de peticiones antes que a maquillar estados rotos.',
            },
            {
                title: 'Componentes que aguantan el cambio',
                text: 'Reutilizar no es extraer todo a un componente. Es dejar claras las variantes y evitar que un ajuste para una pantalla rompa otras tres.',
            },
            {
                title: 'Rendimiento con criterio',
                text: 'No se trata de sacar un 100 en una auditoría, sino de que la web no se sienta pesada en un móvil con mala cobertura.',
            },
            {
                title: 'Entregas aburridas',
                text: 'Pipelines cortas, tests que pasan y despliegues predecibles. Si nadie habla del proceso de entrega, es que funciona.',
            },
        ],
    },
};

export const TwoItems: Story = {
    args: {
        title: 'Dos ideas',
        text: 'El componente se adapta al número de filas.',
        items: [
            {
                title: 'Menos ruido',
                text: 'Cada elemento de la interfaz tiene que ganarse su sitio.',
            },
            {
                title: 'Más claridad',
                text: 'Si algo se puede simplificar, se simplifica.',
            },
        ],
    },
};

export const WithoutIntro: Story = {
    args: {
        items: [
            {
                title: 'Sin título de sección',
                text: 'La lista empieza directamente en la primera fila.',
            },
            { title: 'Sin párrafo introductorio', text: 'Cada fila mantiene su propia jerarquía.' },
        ],
    },
};

export const EmptyItems: Story = {
    args: {
        title: 'Sin filas todavía',
        text: 'El bloque muestra la introducción y deja el espacio vacío hasta que lleguen los datos.',
        items: [],
    },
};
