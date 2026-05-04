import { LinkType } from '@lluc_llull/ui-lib/enums';
import { Meta, StoryObj } from '@storybook/angular';
import { ContactMinimalComponent } from './contact-minimal.component';

export default {
    title: 'Content/ContactMinimal',
    component: ContactMinimalComponent,
    tags: ['autodocs'],
    argTypes: {
        contactsTitle: { control: 'text' },
        socialsTitle: { control: 'text' },
        contacts: { control: 'object' },
        socials: { control: 'object' },
        img: { control: 'object' },
    },
} as Meta<ContactMinimalComponent>;

type Story = StoryObj<ContactMinimalComponent>;

export const Default: Story = {
    args: {
        contactsTitle: 'Contacto',
        socialsTitle: 'Redes Sociales',
        contacts: [
            {
                label: 'email@example.com',
                url: 'mailto:email@example.com',
                linkType: LinkType.External,
            },
            { label: '+34 123 456 789', url: 'tel:+34123456789', linkType: LinkType.External },
        ],
        socials: [
            { label: 'Twitter', url: 'https://twitter.com', linkType: LinkType.External },
            { label: 'LinkedIn', url: 'https://linkedin.com', linkType: LinkType.External },
            { label: 'GitHub', url: 'https://github.com', linkType: LinkType.External },
        ],
        img: {
            url: 'https://picsum.photos/seed/contact/400/300.jpg',
            alt: 'Contact image',
        },
    },
};
