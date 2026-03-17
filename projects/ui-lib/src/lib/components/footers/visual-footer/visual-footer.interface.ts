import { UiLibAddressI, UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib';

export interface VisualFooterI {
    contactTitle?: string;
    contactPhone?: UiLibButtonI;
    contactEmail?: UiLibButtonI;
    addressTitle?: string;
    address?: UiLibAddressI;
    socialsTitle?: string;
    socials?: UiLibButtonI[];
    image?: UiLibImageI;
}
