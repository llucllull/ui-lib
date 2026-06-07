import { mapImageOrGallery } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapMosaicGrid: ComponentMapperFn = (props, cdn) => ({
    text: props?.texts?.editorialText,
    images: mapImageOrGallery(props?.multimedia?.images, cdn),
});
