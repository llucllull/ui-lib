import { Meta, StoryObj } from '@storybook/angular-vite';
import { LinkType } from '@lluc_llull/ui-lib/enums';
import { HeaderMobileComponent } from './header-mobile.component';

export default { title: 'Headers/HeaderMobile', component: HeaderMobileComponent, tags: ['autodocs'], argTypes: { navigation: { control: 'object' }, lang: { control: 'text' } } } as Meta<HeaderMobileComponent>;
type Story = StoryObj<HeaderMobileComponent>;
export const Default: Story = { args: { logo: { url: 'https://placehold.co/240x80/png?text=Lluc+Llull', alt: 'Logo' }, lang: 'es', navigation: { items: [{ label: { es: 'Inicio' }, slug: 'home' }, { label: { es: 'Contacto' }, slug: 'contacto' }] } } };
