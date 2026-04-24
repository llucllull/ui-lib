import { ComponentMapperFn } from './types';

export const mapStackedRows: ComponentMapperFn = (props) => ({
    title: props?.texts?.title,
    text: props?.texts?.text,
    items: props?.items?.map((item: any) => ({
        title: item?.title,
        text: item?.text,
    })),
});
