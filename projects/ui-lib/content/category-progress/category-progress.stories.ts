import { Meta, StoryObj } from '@storybook/angular-vite';
import { CategoryProgressComponent } from './category-progress.component';

export default {
    title: 'Content/CategoryProgress',
    component: CategoryProgressComponent,
    tags: ['autodocs'],
    argTypes: {
        pretitle: { control: 'text' },
        title: { control: 'text' },
        categories: { control: 'object' },
        highlightColor: { control: 'color' },
        highlightThickness: { control: { type: 'range', min: 4, max: 60, step: 2 } },
    },
} as Meta<CategoryProgressComponent>;

type Story = StoryObj<CategoryProgressComponent>;

export const Skills: Story = {
    args: {
        pretitle: 'Stack técnico',
        title: 'Dónde pongo el foco',
        categories: [
            {
                title: 'Front-end',
                items: [
                    { label: 'Angular', value: 92 },
                    { label: 'TypeScript', value: 88 },
                    { label: 'SCSS / CSS moderno', value: 85 },
                    { label: 'Accesibilidad', value: 72 },
                ],
            },
            {
                title: 'Arquitectura y entrega',
                items: [
                    { label: 'SSR / SSG', value: 80 },
                    { label: 'Testing con Vitest', value: 76 },
                    { label: 'CI/CD', value: 70 },
                    { label: 'Rendimiento web', value: 78 },
                ],
            },
        ],
    },
};

export const Languages: Story = {
    args: {
        pretitle: 'Idiomas',
        title: 'Tres idiomas, un mismo contenido',
        categories: [
            {
                title: 'Uso profesional',
                items: [
                    { label: 'Español / Catalán', value: 100 },
                    { label: 'Inglés', value: 78 },
                ],
            },
        ],
    },
};

export const NoPretitle: Story = {
    args: {
        title: 'Solo título y barras',
        categories: [
            {
                title: 'Herramientas',
                items: [
                    { label: 'Storybook', value: 90 },
                    { label: 'Git', value: 86 },
                ],
            },
        ],
    },
};

export const CustomHighlight: Story = {
    args: {
        ...Skills.args,
        highlightColor: '#ec4899',
        highlightThickness: 22,
    },
};
