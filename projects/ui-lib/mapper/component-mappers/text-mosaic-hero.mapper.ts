import { mapImageOrGallery } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapTextMosaicHero: ComponentMapperFn = (props, cdn) => ({
    title: props?.texts?.title,
    images: mapImageOrGallery(props?.multimedia?.images, cdn),
});
