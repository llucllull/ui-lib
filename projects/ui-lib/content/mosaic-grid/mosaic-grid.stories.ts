import { Meta, StoryObj } from '@storybook/angular-vite';
import { MosaicGridComponent } from './mosaic-grid.component';

export default { title: 'Content/MosaicGrid', component: MosaicGridComponent, tags: ['autodocs'], argTypes: { text: { control: 'text' }, images: { control: 'object' } } } as Meta<MosaicGridComponent>;
type Story = StoryObj<MosaicGridComponent>;
export const Default: Story = { args: { text: 'Una selección de imágenes presentada como mosaico.', images: [1, 2, 3, 4, 5, 6, 7].map((n) => ({ url: `https://picsum.photos/seed/mosaic-grid-${n}/800/600.jpg`, alt: `Imagen ${n}` })) } };
export const Empty: Story = { args: { text: 'Sin imágenes todavía.', images: [] } };
