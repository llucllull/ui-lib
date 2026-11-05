import { Meta, StoryObj } from '@storybook/angular';
import { ColumnsMediaStackedComponent } from './columns-media-stacked.component';

export default { title: 'Content/ColumnsMediaStacked', component: ColumnsMediaStackedComponent, tags: ['autodocs'], argTypes: { direction: { control: 'radio', options: ['left', 'right'] }, image: { control: 'object' } } } as Meta<ColumnsMediaStackedComponent>;
type Story = StoryObj<ColumnsMediaStackedComponent>;
export const Default: Story = { args: { leftColumn: 'Contenido de la columna izquierda.', rightColumn: 'Contenido de la columna derecha.', direction: 'right', image: { url: 'https://picsum.photos/seed/columns-stacked/1600/900.jpg', alt: 'Arquitectura' } } };
export const Reversed: Story = { args: { ...Default.args, direction: 'left' } };
