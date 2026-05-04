import { ComponentMapperFn } from './types';

export const mapContentDocument: ComponentMapperFn = (props) => ({
    title: props?.texts?.title,
    items: props?.items?.map((item: any) => ({
        title: item?.title,
        text: item?.text,
    })),
});
