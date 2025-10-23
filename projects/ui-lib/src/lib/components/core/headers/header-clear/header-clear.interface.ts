import { UiLibButtonI, UiLibImageI, UiLibNavItemsI, UiLibSocialItemsI } from "../../../../interfaces";

export interface HeaderClearI {
  logo?: UiLibImageI;
  logoDark?: UiLibImageI;
  lang?: string;
  navItems?: UiLibNavItemsI[];
  homeLink?: UiLibButtonI;
  socialItems?: UiLibSocialItemsI[]
}