import { Meta, StoryObj } from '@storybook/angular';
import { LinkType } from "../../../directives";
import { VisualFooterComponent } from "./visual-footer.component";

export default {
  title: 'Core/VisualFooter',
  component: VisualFooterComponent,
  tags: ['autodocs'],
} as Meta<VisualFooterComponent>;

type Story = StoryObj<VisualFooterComponent>;

export const Default: Story = {
  args: {
    contactTitle: 'Contacto',
    contactPhone: 
      {
        label: '+34 600 000 000',
        url: 'tel:34600000000',
        linkType: LinkType.External,
        icon: '',
      },
    contactEmail:
    {
      label: 'test@test.com',
      url: 'mailto:test@test.com',
      linkType: LinkType.External,
      icon: '',
    },
    addressTitle: 'Dirección',
    address: {
      address: 'Calle Mayor, 15',
      city: 'Madrid',
      country: 'España',
      cp: '28013',
      province: 'Madrid',
    },    
    socialsTitle: 'Redes Sociales',
    socials: [
      {
        label: 'Facebook',
        url: 'https://www.facebook.com',
        linkType: LinkType.External,
        icon: 'facebook',
      },
      {
        label: 'Instagram',
        url: 'https://www.instagram.com',
        linkType: LinkType.External,
        icon: 'instagram',
      },
      {
        label: 'X',
        url: 'https://www.x.com',
        linkType: LinkType.External,
        icon: 'twitter',
      },
      {
        label: 'YouTube',
        url: 'https://www.youtube.com',
        linkType: LinkType.External,
        icon: 'youtube',
      },
      {
        label: 'Tiktok',
        url: 'https://www.tiktok.com',
        linkType: LinkType.External,
        icon: 'tiktok',
      },
    ],
    image: 
      {
        url: 'https://placehold.co/1300x870.png',
        alt: 'image',
      },
  }
};