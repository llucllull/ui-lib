import { LinkType } from "@lluc_llull/ui-lib/enums";

export interface UiLibButtonI {
    label: string;
    url: string;
    linkType: LinkType;
    icon?: string;
}
