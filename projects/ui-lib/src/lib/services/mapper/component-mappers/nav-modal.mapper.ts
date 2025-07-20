import { ComponentMapperFn } from "./types";

export const mapNavModalWithLang = (props: any[], langCode: string) => {
  if (!Array.isArray(props)) return [];
  
  return props.map(item => {
    // Usar directamente la URL que ya viene en nav_link.url
    const url = item.nav_link?.url ?? item.nav_link?.external_url;
    
    return {
      label: item.label,
      url: url,
      linkType: item.nav_link?.linktype,
      children: item.nav_link?.children || [],
      active: item.nav_link?.active,
      order: item.nav_link?.order,
    };
  });
};

export const mapNavModal: ComponentMapperFn = (props) => {
  if (!Array.isArray(props)) return [];
  
  return props.map(item => ({
    label: item.label,
    url: item.nav_link?.url ?? item.nav_link?.external_url,
    linkType: item.nav_link?.linktype,
    children: item.nav_link?.children || [],
    active: item.nav_link?.active,
    order: item.nav_link?.order,
  }));
};