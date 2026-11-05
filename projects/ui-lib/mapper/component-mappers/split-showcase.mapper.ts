import { mapButtons } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapSplitShowcase: ComponentMapperFn = (props) => ({
    title: props?.texts?.title,
    subtitle: props?.texts?.subtitle,
    description: props?.texts?.description,
    metas: props?.meta?.map((item: any) => ({
        label: item?.label,
        value: item?.value,
    })),
    buttons: mapButtons(props?.buttons)
});