import { Meta, StoryObj } from '@storybook/angular';
import { LinkType } from '@lluc_llull/ui-lib/enums';
import { LegalFooterComponent } from './legal-footer.component';

export default {
    title: 'Core/Footers/LegalFooter',
    component: LegalFooterComponent,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['simple', 'extended'],
        },
    },
} as Meta<LegalFooterComponent>;

type Story = StoryObj<LegalFooterComponent>;

export const Default: Story = {
    args: {
        brand: 'Lluc Llull',
        year: 2025,
        credits: 'Diseñado por Lluc Llull',
        links: [
            {
                label: 'Link 1',
                url: 'https://www.google.com',
                linkType: LinkType.External,
                icon: '',
            },
            {
                label: 'Link 2',
                url: 'https://www.google.com',
                linkType: LinkType.External,
                icon: '',
            },
            {
                label: 'Link 3',
                url: 'https://www.google.com',
                linkType: LinkType.External,
                icon: '',
            },
            {
                label: 'Link 4',
                url: 'https://www.google.com',
                linkType: LinkType.External,
                icon: '',
            },
            {
                label: 'Link 5',
                url: 'https://www.google.com',
                linkType: LinkType.External,
                icon: '',
            },
        ],
    },
};
