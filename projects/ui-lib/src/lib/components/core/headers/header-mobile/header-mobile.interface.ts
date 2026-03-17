import {
    UiLibButtonI,
    UiLibImageI,
    UiLibNavItemsI,
    UiLibSocialItemsI,
} from '../../../../interfaces';

export interface HeaderMobileI {
    logo?: UiLibImageI;
    logoDark?: UiLibImageI;
    lang?: string;
    navItems?: UiLibNavItemsI[];
    homeLink?: UiLibButtonI;
    socialItems?: UiLibSocialItemsI[];
}
