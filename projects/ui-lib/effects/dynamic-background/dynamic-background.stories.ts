import { CommonModule } from '@angular/common';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DynamicBackgroundComponent } from './dynamic-background.component';

const meta: Meta<DynamicBackgroundComponent> = {
    title: 'Effects/Dynamic Background',
    component: DynamicBackgroundComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, DynamicBackgroundComponent],
        }),
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Un fondo animado en 3D usando **Three.js**.

Este componente renderiza efectos dinámicos (por ejemplo una esfera deformada).  
Puedes personalizar el **efecto**, la **velocidad de rotación**, el **tamaño** y los **colores**.
        `,
            },
        },
        layout: 'fullscreen',
    },
    argTypes: {
        effect: {
            control: { type: 'select' },
            options: ['sphere-deform', 'ring-transform', 'particles'],
            description: 'Efecto visual a renderizar.',
        },
        rotationSpeed: {
            control: { type: 'number', min: 0, max: 0.1, step: 0.01 },
            description: 'Velocidad de rotación del efecto.',
        },
        size: {
            control: { type: 'number', min: 1, max: 10, step: 1 },
            description: 'Tamaño base del objeto 3D.',
        },
        backgroundColor: {
            control: 'color',
            description: 'Color de fondo del canvas.',
        },
        elementColor: {
            control: 'color',
            description: 'Color del objeto renderizado (si aplica).',
        },
    },
};

export default meta;
type Story = StoryObj<DynamicBackgroundComponent>;

export const Default: Story = {
    args: {
        effect: 'sphere-deform',
        rotationSpeed: 0.02,
        size: 3,
        backgroundColor: '#111111',
        elementColor: '#00ffcc',
    },
};

export const LargeSphere: Story = {
    args: {
        effect: 'sphere-deform',
        size: 6,
        rotationSpeed: 0.01,
        backgroundColor: '#000000',
        elementColor: '#ff0066',
    },
};

export const FastRotation: Story = {
    args: {
        effect: 'sphere-deform',
        rotationSpeed: 0.08,
        size: 3,
        backgroundColor: '#222222',
        elementColor: '#ffaa00',
    },
};
