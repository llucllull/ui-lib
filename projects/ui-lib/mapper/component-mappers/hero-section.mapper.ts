import { mapButtons } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapHeroSection: ComponentMapperFn = (props) => ({
    pretitle: props?.texts?.pretitle,
    title: props?.texts?.title,
    subtitle: props?.texts?.subtitle,
    text: props?.texts?.text,
    buttons: mapButtons(props?.buttons),
    highlight: props?.texts?.highlight,
});
