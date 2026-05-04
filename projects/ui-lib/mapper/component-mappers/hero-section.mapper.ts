import { mapButtons, mapImage } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapHeroSection: ComponentMapperFn = (props, cdn) => ({
    pretitle: props?.texts?.pretitle,
    title: props?.texts?.title,
    subtitle: props?.texts?.subtitle,
    text: props?.texts?.text,
    buttons: mapButtons(props?.buttons),
    highlight: props?.texts?.highlight,
    variant: props?.variant,
    image: mapImage(props?.multimedia?.image, cdn),
});
