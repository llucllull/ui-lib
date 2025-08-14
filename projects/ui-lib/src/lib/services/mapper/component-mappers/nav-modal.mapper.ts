import { UiLibNavItemsI, UiLibSocialItemsI } from "../../../interfaces";

// helpers
const isArray = Array.isArray;
const isHttp = (u?: string | null) => !!u && /^https?:\/\//i.test(u ?? '');

export const mapNavModalWithLang = (props: any[], _langCode: string): UiLibNavItemsI[] =>
  mapNavModal(props);

export const mapNavModal = (props: any[]): UiLibNavItemsI[] => {
  if (!isArray(props)) return [];

  return props
    .map<UiLibNavItemsI | null>((item) => {
      const link = item?.nav_link ?? {};
      const url: string | undefined = link.url ?? link.external_url ?? undefined;

      const mapped: UiLibNavItemsI = {
        label: item?.label ?? link?.name ?? '',
        url,
        linkType: link?.linktype,          
        name: link?.name,
        active: link?.active ?? true,
        children: isArray(link?.children) ? (link.children as any) : [], // UiLibButtonI[]
      };

      if (!mapped.label || !mapped.url) return null;
      return mapped;
    })
    .filter((x): x is UiLibNavItemsI => !!x);
};

export const mapSocialLinks = (props: any[]): UiLibSocialItemsI[] => {
  if (!isArray(props)) return [];

  return props
    .map<UiLibSocialItemsI | null>((item) => {
      const link = item?.nav_link ?? item ?? {};
      const url: string | undefined = link.url ?? link.external_url ?? undefined;

      const mapped: UiLibSocialItemsI = {
        label: item?.label ?? link?.name ?? '',
        url: url ?? '',
        linkType: link?.linktype ?? (isHttp(url) ? 'external' : 'internal'),
        icon: (item?.icon ?? link?.icon ?? '') as string,
        order: item?.order ?? link?.order,
      };

      if (!mapped.label || !mapped.url) return null;

      if (mapped.icon == null) mapped.icon = '';

      return mapped;
    })
    .filter((x): x is UiLibSocialItemsI => !!x);
};
