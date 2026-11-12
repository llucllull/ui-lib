import { Meta, StoryObj } from '@storybook/angular-vite';
import { MediaIntroComponent } from './media-intro.component';

export default { title: 'Content/MediaIntro', component: MediaIntroComponent, tags: ['autodocs'], argTypes: { direction: { control: 'radio', options: ['left', 'right'] }, media: { control: 'object' } } } as Meta<MediaIntroComponent>;
type Story = StoryObj<MediaIntroComponent>;
export const Default: Story = { args: { highlightedText: 'Diseño que inspira', secondaryText: 'Una introducción visual para presentar el contenido.', direction: 'right', media: { url: 'https://picsum.photos/seed/media-intro/1600/900.jpg', alt: 'Paisaje' } } };
export const ImageFirst: Story = { args: { ...Default.args, direction: 'left' } };
