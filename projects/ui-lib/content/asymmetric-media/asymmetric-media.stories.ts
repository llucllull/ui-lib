import { Meta, StoryObj } from '@storybook/angular-vite';
import { editorialImages, landscapeImage, mobileImage } from '../../.storybook/mocks';
import { AsymmetricMediaComponent } from './asymmetric-media.component';

export default {
    title: 'Content/AsymmetricMedia',
    component: AsymmetricMediaComponent,
    tags: ['autodocs'],
    argTypes: {
        media: {
            control: 'object',
            description: 'Siempre necesita dos imágenes: una pequeña y una grande.',
        },
        direction: { control: 'radio', options: ['left', 'right'] },
    },
} as Meta<AsymmetricMediaComponent>;

type Story = StoryObj<AsymmetricMediaComponent>;

export const Right: Story = {
    args: {
        direction: 'right',
        media: [editorialImages[0], editorialImages[1]],
    },
};

export const Left: Story = {
    args: {
        direction: 'left',
        media: [mobileImage, landscapeImage],
    },
};

export const EditorialPair: Story = {
    args: {
        direction: 'left',
        media: [editorialImages[5], editorialImages[6]],
    },
};

export const Empty: Story = {
    args: {
        direction: 'right',
        media: [],
    },
};
