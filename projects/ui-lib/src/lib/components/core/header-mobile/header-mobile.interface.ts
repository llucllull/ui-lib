import { UiLibButtonI } from "../../../interfaces/ui-lib-button.interface";
import { UiLibImageI } from "../../../interfaces/ui-lib-image.interface";
import { UiLibNavItemsI, UiLibSocialItemsI } from "../../../interfaces/ui-lib-nav-items.interface";

export interface HeaderMobileI {
  logo?: UiLibImageI;
  logoDark?: UiLibImageI;
  lang?: string;
  navItems?: UiLibNavItemsI[];
  homeLink?: UiLibButtonI;
  socialItems?: UiLibSocialItemsI[]
}