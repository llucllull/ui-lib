import { mapImageOrGallery } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapMediaSplit: ComponentMapperFn = (props, cdn) => ({
    title: props?.texts?.title,
    text: props?.texts?.text,
    images: mapImageOrGallery(props?.multimedia?.images, cdn),
});
