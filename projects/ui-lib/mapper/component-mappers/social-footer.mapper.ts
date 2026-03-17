import { mapButtons, mapImage } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapSocialFooter: ComponentMapperFn = (props) => ({
    images: mapImage(props?.multimedia),
    socials: mapButtons(props?.social_links),
    hashtag: props?.texts?.hashtag,
});
