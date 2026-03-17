import { mapButtons } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const map404: ComponentMapperFn = (props) => ({
    title: props?.texts?.title,
    subtitle: props?.texts?.subtitle,
    highlight: props?.texts?.highlight,
    button: mapButtons(props?.buttons)[0],
});
