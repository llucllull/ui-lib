import { LinkType } from "../../../directives";
import { LinksFooterComponent } from "./links-footer.component";
import { Meta, StoryObj } from '@storybook/angular';

export default {
  title: 'Core/LinksFooter',
  component: LinksFooterComponent,
  tags: ['autodocs']
} as Meta<LinksFooterComponent>;

type Story = StoryObj<LinksFooterComponent>;

export const Default: Story = {
  args: {
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
  }
};