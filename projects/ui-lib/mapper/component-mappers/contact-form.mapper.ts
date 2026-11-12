import { mapImage } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapContactForm: ComponentMapperFn = (props, cdn) => ({
    ...props,
    img: mapImage(props?.multimedia?.image, cdn),
});
