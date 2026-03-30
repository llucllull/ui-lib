import { mapButtons, mapImage } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapSplitPreviewer: ComponentMapperFn = (props, cdn) => ({
    title: props?.texts?.title,
    items: props?.items?.map((item: any) => ({
        title: item.title,
        description: item.description,
        tags: item.tags,
        link: mapButtons(item?.buttons)[0],
        image: mapImage(item?.multimedia?.image, cdn),
    })),
    imageDefault: mapImage(props?.multimedia?.image, cdn),
    direction: props?.direction || 'right',
});
