import { mapImageOrGallery } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapAsymmetricMedia: ComponentMapperFn = (props, cdn) => ({
    media: mapImageOrGallery(props?.multimedia?.images, cdn),
    direction: props?.direction || 'right',
});