import { LinkType } from "../../../Enum/link-type.enum";
import { HeaderClearComponent } from "./header-clear.component";
import { Meta, StoryObj } from '@storybook/angular';

export default {
  title: 'Core/HeaderClear',
  component: HeaderClearComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    text: { control: 'text' },
    buttons: { control: 'object' },
  },
} as Meta<HeaderClearComponent>;

type Story = StoryObj<HeaderClearComponent>;

export const Default: Story = {
  args: {
    // logo: {
    //   url: 'https://placehold.co/60x40',
    //   alt: 'Logo',
    // },
    lang: 'ES',
    navItems: [
      { label: 'Menu 1', url: 'https://www.google.com', linkType: LinkType.External },
      { label: 'Menu 2', url: 'https://www.google.com', linkType: LinkType.External },
      { label: 'Menu 3', url: 'https://www.google.com', linkType: LinkType.External },
      { label: 'Menu 4', url: 'https://www.google.com', linkType: LinkType.External },
      { label: 'Menu 5', url: 'https://www.google.com', linkType: LinkType.External },
    ]
  }
};