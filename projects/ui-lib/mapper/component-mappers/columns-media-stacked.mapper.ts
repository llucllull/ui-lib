import { mapImage } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapColumnsMediaStacked: ComponentMapperFn = (props, cdn) => ({
    leftColumn: props?.texts?.leftColumn,
    rightColumn: props?.texts?.rightColumn,
    direction: props?.direction || 'right',
    image: mapImage(props?.multimedia?.image, cdn),
});