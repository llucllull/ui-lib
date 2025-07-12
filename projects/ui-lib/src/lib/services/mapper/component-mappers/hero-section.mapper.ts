import { mapButtons } from '../../../utils/utils';
import { ComponentMapperFn } from './types';

export const mapHeroSection: ComponentMapperFn = (props) => ({
    title: props?.texts?.title,
    subtitle: props?.texts?.subtitle,
    text: props?.texts?.text,
    buttons: mapButtons(props?.buttons),
});
