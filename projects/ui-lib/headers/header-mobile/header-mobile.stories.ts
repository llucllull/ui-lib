import { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, within } from 'storybook/test';
import { brandLogos, homeLink, navigation, socialItems } from '../../.storybook/mocks';
import { HeaderMobileComponent } from './header-mobile.component';

export default {
    title: 'Headers/HeaderMobile',
    component: HeaderMobileComponent,
    tags: ['autodocs'],
    argTypes: {
        logo: { control: 'object' },
        logoDark: { control: 'object' },
        navigation: {
            control: 'object',
            description:
                'Objeto con `items`. El componente genera los enlaces a partir de `navigation` y `lang`.',
        },
        lang: { control: 'text' },
        socialItems: { control: 'object' },
        homeLink: { control: 'object' },
    },
} as Meta<HeaderMobileComponent>;

type Story = StoryObj<HeaderMobileComponent>;

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
    },
};

export const WithoutSocials: Story = {
    args: {
        ...Default.args,
        socialItems: undefined,
    },
};

export const TwoItems: Story = {
    args: {
        ...Default.args,
        navigation: {
            items: [
                { slug: 'home', label: { es: 'Inicio' } },
                { slug: 'contact', label: { es: 'Contacto' } },
            ],
        },
    },
};

/** Abre el menú móvil con un clic real. */
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
