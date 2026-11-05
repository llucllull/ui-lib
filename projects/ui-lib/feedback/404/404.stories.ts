import { Meta, StoryObj } from '@storybook/angular';
import { LinkType } from '@lluc_llull/ui-lib/enums';
import { NotFoundComponent } from './404.component';

export default { title: 'Feedback/404', component: NotFoundComponent, tags: ['autodocs'] } as Meta<NotFoundComponent>;
type Story = StoryObj<NotFoundComponent>;
export const Default: Story = { args: { title: 'Página no encontrada', subtitle: 'La página que buscas no existe.', highlight: '404', button: { label: 'Volver al inicio', url: '/', linkType: LinkType.Internal } } };
