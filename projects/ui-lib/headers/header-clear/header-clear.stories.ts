import { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, within } from 'storybook/test';
import { brandLogos, homeLink, navigation, socialItems } from '../../.storybook/mocks';
import { HeaderClearComponent } from './header-clear.component';

export default {
    title: 'Headers/HeaderClear',
    component: HeaderClearComponent,
    tags: ['autodocs'],
    argTypes: {
        logo: { control: 'object', description: 'Logo para el tema claro.' },
        logoDark: { control: 'object', description: 'Logo para el tema oscuro.' },
        navigation: {
            control: 'object',
            description:
                'Objeto con `items`. El componente genera los enlaces a partir de `navigation` y `lang`.',
        },
        lang: { control: 'text', description: 'Código de idioma usado para construir las URLs.' },
        socialItems: { control: 'object' },
        homeLink: { control: 'object' },
        navItems: {
            control: 'object',
            description: 'Se sobrescribe en ngOnChanges a partir de `navigation`.',
        },
    },
} as Meta<HeaderClearComponent>;

type Story = StoryObj<HeaderClearComponent>;

export const Default: Story = {
    args: {
        logo: brandLogos.light,
        logoDark: brandLogos.dark,
        navigation,
        lang: 'es',
        socialItems,
        homeLink,
    },
};

export const English: Story = {
    args: {
        ...Default.args,
        lang: 'en',
        navigation: {
            items: [
                { slug: 'home', label: { es: 'Inicio', ca: 'Inici', en: 'Home' } },
                { slug: 'projects', label: { es: 'Proyectos', ca: 'Projectes', en: 'Projects' } },
                { slug: 'about', label: { es: 'Sobre mí', ca: 'Sobre mi', en: 'About' } },
                { slug: 'contact', label: { es: 'Contacto', ca: 'Contacte', en: 'Contact' } },
            ],
        },
    },
};

export const WithoutSocials: Story = {
    args: {
        ...Default.args,
        socialItems: undefined,
    },
};

export const Minimal: Story = {
    args: {
        logo: brandLogos.light,
        logoDark: brandLogos.dark,
        lang: 'es',
        navigation: {
            items: [
                { slug: 'home', label: { es: 'Inicio' } },
                { slug: 'contact', label: { es: 'Contacto' } },
            ],
        },
    },
};

/** Abre el menú mediante un clic real para revisar la transición del modal. */
export const MenuOpen: Story = {
    args: {
        ...Default.args,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Open nav' }));
        await expect(canvas.getByRole('button', { name: 'Close menu' })).toBeTruthy();
    },
};
