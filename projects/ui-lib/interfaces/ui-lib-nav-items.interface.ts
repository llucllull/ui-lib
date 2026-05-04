import { LinkType } from "@lluc_llull/ui-lib/enums";
import { UiLibButtonI } from './ui-lib-button.interface';

export interface UiLibNavItemsI {
    label?: string;
    url?: string;
    linkType?: LinkType;
    name?: string;
    active?: boolean;
    children?: UiLibButtonI[];
}

export interface UiLibSocialItemsI {
    label: string;
    url: string;
    linkType?: LinkType;
    icon?: string;
    order?: number;
}
