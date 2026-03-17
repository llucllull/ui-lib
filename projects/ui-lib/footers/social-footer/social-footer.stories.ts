import { Meta, StoryObj } from '@storybook/angular';
import { LinkType } from '../../../../../../directives';
import { SocialFooterComponent } from './social-footer.component';

export default {
    title: 'Core/Footers/SocialFooter',
    component: SocialFooterComponent,
    tags: ['autodocs'],
} as Meta<SocialFooterComponent>;

type Story = StoryObj<SocialFooterComponent>;

export const Default: Story = {
    args: {
        images: [
            {
                url: 'https://placehold.co/600x400.png',
                alt: 'image1',
            },
            {
                url: 'https://placehold.co/600x400.png',
                alt: 'image2',
            },
            {
                url: 'https://placehold.co/600x400.png',
                alt: 'image3',
            },
            {
                url: 'https://placehold.co/600x400.png',
                alt: 'image4',
            },
            {
                url: 'https://placehold.co/600x400.png',
                alt: 'image5',
            },
            {
                url: 'https://placehold.co/600x400.png',
                alt: 'image6',
            },
            {
                url: 'https://placehold.co/600x400.png',
                alt: 'image7',
            },
            {
                url: 'https://placehold.co/600x400.png',
                alt: 'image8',
            },
        ],
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
        hashtag: '#Hastag',
    },
};
