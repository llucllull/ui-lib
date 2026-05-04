import { mapButtons } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapColumnsFooter: ComponentMapperFn = (props) => ({
    column1Item: props?.column1?.map((item: any) => ({
        title: item?.title,
        items: mapButtons(item?.buttons),
    })),
    column2Item: props?.column2?.map((item: any) => ({
        title: item?.title,
        items: mapButtons(item?.buttons),
    })),
    column3Item: props?.column3?.map((item: any) => ({
        title: item?.title,
        items: mapButtons(item?.buttons),
    })),
    copyright: props?.copyright?.map((item: any) => ({
        year: item?.year,
        name: item?.name,
        rights: item?.rights,
    })),
});
