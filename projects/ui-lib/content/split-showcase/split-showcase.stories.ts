import { Meta, StoryObj } from '@storybook/angular';
import { LinkType } from '@lluc_llull/ui-lib/enums';
import { SplitShowcaseComponent } from './split-showcase.component';

export default { title: 'Content/SplitShowcase', component: SplitShowcaseComponent, tags: ['autodocs'], argTypes: { metas: { control: 'object' }, buttons: { control: 'object' } } } as Meta<SplitShowcaseComponent>;
type Story = StoryObj<SplitShowcaseComponent>;
export const Default: Story = { args: { title: 'Proyecto destacado', subtitle: 'Una solución pensada para crecer', description: 'Presenta una pieza de contenido con sus datos principales y acciones.', metas: [{ label: 'Cliente', value: 'Acme' }, { label: 'Año', value: '2026' }], buttons: [{ label: 'Ver proyecto', url: 'https://example.com', linkType: LinkType.External }] } };
