import { mapImage } from "../../../utils/utils";
import { mapNavModalWithLang } from "./nav-modal.mapper";
import { ComponentMapperFn } from "./types";

export const mapHeaderClear: ComponentMapperFn = (props) => {
  // Obtener el idioma de las props
  const currentLang = props?.lang || 'es';
  
  // Mapear solo los navLinks del nav-modal con el idioma correcto
  const navItems = mapNavModalWithLang(props?.['nav-modal']?.navLinks || [], currentLang);
  
  return { 
    logo: mapImage(props?.logo),
    logoDark: mapImage(props?.logoDark),
    lang: currentLang,
    navItems: navItems,
    homeLink: navItems[0]
  };
};