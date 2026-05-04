import { Meta, StoryObj } from '@storybook/angular';
import { LinkType } from "@lluc_llull/ui-lib/enums";
import { SplitPreviewerComponent } from './split-previewer.component';

export default {
    title: 'Content/SplitPreviewer',
    component: SplitPreviewerComponent,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        direction: { control: 'radio', options: ['left', 'right'] },
        items: { control: 'object' },
        imageDefault: { control: 'object' },
    },
} as Meta<SplitPreviewerComponent>;

type Story = StoryObj<SplitPreviewerComponent>;

export const Default: Story = {
    args: {
        title: 'Galería de Proyectos',
        direction: 'right',
        imageDefault: {
            url: 'https://picsum.photos/seed/default/800/600.jpg',
            alt: 'Imagen por defecto',
        },
        items: [
            {
                title: 'Proyecto Alpha',
                type: 'Desarrollo Web',
                description: 'Sitio web moderno con diseño responsive y funcionalidades avanzadas.',
                tags: ['React', 'TypeScript', 'Tailwind'],
                link: {
                    label: 'Ver proyecto',
                    url: 'https://example.com/project-alpha',
                    linkType: LinkType.External,
                },
                image: {
                    url: 'https://picsum.photos/seed/alpha/400/300.jpg',
                    alt: 'Proyecto Alpha',
                },
            },
            {
                title: 'Proyecto Beta',
                type: 'Aplicación Móvil',
                description: 'App nativa para iOS y Android con experiencia de usuario optimizada.',
                tags: ['React Native', 'Firebase', 'Redux'],
                link: {
                    label: 'Ver proyecto',
                    url: 'https://example.com/project-beta',
                    linkType: LinkType.External,
                },
                image: {
                    url: 'https://picsum.photos/seed/beta/400/300.jpg',
                    alt: 'Proyecto Beta',
                },
            },
            {
                title: 'Proyecto Gamma',
                type: 'E-commerce',
                description: 'Plataforma de comercio electrónico con sistema de pagos integrado.',
                tags: ['Angular', 'Node.js', 'MongoDB'],
                link: {
                    label: 'Ver proyecto',
                    url: 'https://example.com/project-gamma',
                    linkType: LinkType.External,
                },
                image: {
                    url: 'https://picsum.photos/seed/gamma/400/300.jpg',
                    alt: 'Proyecto Gamma',
                },
            },
        ],
    },
};

export const LeftDirection: Story = {
    ...Default,
    args: {
        ...Default.args,
        direction: 'left',
    },
};
