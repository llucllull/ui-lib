import { LinkType } from '../enums/link-type.enum';
export interface UiLibButtonI {
    label: string;
    url: string;
    linkType: LinkType;
    icon?: string;
}
