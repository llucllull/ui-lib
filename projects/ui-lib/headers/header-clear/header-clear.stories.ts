import { LinkType } from '@lluc_llull/ui-lib/enums';
import { Meta, StoryObj } from '@storybook/angular';
import { HeaderClearComponent } from './header-clear.component';

export default {
    title: 'Headers/HeaderClear',
    component: HeaderClearComponent,
    tags: ['autodocs'],
} as Meta<HeaderClearComponent>;

type Story = StoryObj<HeaderClearComponent>;

export const Default: Story = {
    args: {
        logo: {
            url: 'https://cdn.llucllull.dev/assets/v1/logos/logo-metalico-v2.webp',
            alt: 'Logo',
        },
        lang: 'ES',
        navItems: [
            { label: 'Menu 1', url: 'https://www.google.com', linkType: LinkType.External },
            { label: 'Menu 2', url: 'https://www.google.com', linkType: LinkType.External },
            { label: 'Menu 3', url: 'https://www.google.com', linkType: LinkType.External },
            { label: 'Menu 4', url: 'https://www.google.com', linkType: LinkType.External },
            { label: 'Menu 5', url: 'https://www.google.com', linkType: LinkType.External },
        ],
    },
};
