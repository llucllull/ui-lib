import { UiLibNavItemsI, UiLibSocialItemsI } from '../../../interfaces';

export const mapNavModal = (navigation: any, lang: string): UiLibNavItemsI[] => {
    if (!navigation?.items || !Array.isArray(navigation.items)) return [];

    return navigation.items.map((item: any) => {
        const slug = item.slug;

        const url = slug === 'home' || slug === '' ? `/${lang}` : `/${lang}/${slug}`;

        return {
            label: item.label?.[lang] ?? item.label?.['es'] ?? slug,
            url,
            linkType: 'internal',
            name: slug,
            active: true,
            children: [],
        };
    });
};

export const mapSocialLinks = (navigation: any): UiLibSocialItemsI[] => {
    if (!navigation?.social || !Array.isArray(navigation.social)) return [];

    return navigation.social.map((item: any, index: number) => ({
        label: item.label ?? '',
        url: item.url ?? '',
        linkType: item.linkType ?? 'external',
        icon: item.icon ?? '',
        order: item.order ?? index,
    }));
};
