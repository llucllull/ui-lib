import { mapButtons } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapColumnsFooter: ComponentMapperFn = (props) => ({
    columns: props?.columns?.map((col: any) => ({
        title: col?.texts?.title,
        items: mapButtons(col?.buttons),
    })),
    copyright: {
        year: props?.copyright?.texts?.year,
        name: props?.copyright?.texts?.name,
        rights: props?.copyright?.texts?.rights,
    },
});
