import { UiLibImageI } from "../../../interfaces/ui-lib-image.interface";
import { UiLibNavItemsI } from "../../../interfaces/ui-lib-nav-items.interface";

export interface HeaderMobileI {
  logo?: UiLibImageI;
  lang?: string;
  navItems?: UiLibNavItemsI[];
}