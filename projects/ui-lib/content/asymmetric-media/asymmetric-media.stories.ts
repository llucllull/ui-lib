import { Meta, StoryObj } from '@storybook/angular';
import { AsymmetricMediaComponent } from './asymmetric-media.component';

export default { title: 'Content/AsymmetricMedia', component: AsymmetricMediaComponent, tags: ['autodocs'], argTypes: { media: { control: 'object' }, direction: { control: 'radio', options: ['left', 'right'] } } } as Meta<AsymmetricMediaComponent>;
type Story = StoryObj<AsymmetricMediaComponent>;
export const Default: Story = { args: { direction: 'right', media: [{ url: 'https://picsum.photos/seed/asymmetric-small/800/600.jpg', alt: 'Gato' }, { url: 'https://picsum.photos/seed/asymmetric-large/1200/900.jpg', alt: 'Perro' }] } };
export const Reversed: Story = { args: { ...Default.args, direction: 'left' } };
