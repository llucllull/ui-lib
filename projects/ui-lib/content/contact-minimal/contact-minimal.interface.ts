import { UiLibButtonI, UiLibImageI } from "@lluc_llull/ui-lib/interfaces";

export interface ContactMinimalI {
    contactsTitle?: string;
    socialsTitle?: string;
    contacts?: UiLibButtonI[];
    socials?: UiLibButtonI[];
    img?: UiLibImageI;
}