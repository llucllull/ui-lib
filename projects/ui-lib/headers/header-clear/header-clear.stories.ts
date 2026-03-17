import { Meta, StoryObj } from '@storybook/angular';
import { LinkType } from "@lluc_llull/ui-lib/enums";
import { HeaderClearComponent } from './header-clear.component';

export default {
    title: 'Core/Headers/HeaderClear',
    component: HeaderClearComponent,
    tags: ['autodocs'],
} as Meta<HeaderClearComponent>;

type Story = StoryObj<HeaderClearComponent>;

export const Default: Story = {
    args: {
        logo: {
            url: 'https://ujpxanmobdxrwjsndrzq.supabase.co/storage/v1/object/public/branding/logos/logo-primary.svg',
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
