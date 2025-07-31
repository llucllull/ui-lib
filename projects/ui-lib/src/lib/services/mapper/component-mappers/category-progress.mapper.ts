import { ComponentMapperFn } from './types';

export const mapCategoryProgress: ComponentMapperFn = (props) => ({
    pretitle: props?.texts?.pretitle,
    title: props?.texts?.title,
    categories: props?.items?.map(
      (item: any) => ({
        title: item.title,
        items: item.items?.map(
          (subItem: any) => ({
            label: subItem.name,
            value: subItem.progress
          })
        )
      })
    ),
});