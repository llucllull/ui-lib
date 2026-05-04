import {
    UiLibButtonI,
    UiLibImageI,
    UiLibNavItemsI,
    UiLibSocialItemsI,
} from '@lluc_llull/ui-lib/interfaces';

export interface HeaderMobileI {
    logo?: UiLibImageI;
    logoDark?: UiLibImageI;
    lang?: string;
    navItems?: UiLibNavItemsI[];
    homeLink?: UiLibButtonI;
    socialItems?: UiLibSocialItemsI[];
}
