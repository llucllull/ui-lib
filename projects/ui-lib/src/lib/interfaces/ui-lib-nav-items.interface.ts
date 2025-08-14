import { LinkType } from "../Enum/link-type.enum";
import { UiLibButtonI } from "./ui-lib-button.interface";
import { UiLibImageI } from "./ui-lib-image.interface";

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
    icon: string;
    order?: number;
}