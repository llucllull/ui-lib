import { LinkType } from "../Enum/link-type.enum";
export interface UiLibButtonI {
    label: string;
    url: string;
    linkType: LinkType;
    icon?: string;
}
