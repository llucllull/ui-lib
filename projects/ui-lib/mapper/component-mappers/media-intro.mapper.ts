import { mapImage } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapMediaIntro: ComponentMapperFn = (props, cdn) => ({
    highlightedText: props?.texts?.highlightedText,
    secondaryText: props?.texts?.secondaryText,
    direction: props?.direction ?? 'left',
    media: mapImage(props?.multimedia?.image, cdn),
});