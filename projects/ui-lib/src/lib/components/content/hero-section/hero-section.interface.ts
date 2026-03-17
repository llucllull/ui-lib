import { UiLibButtonI } from '@lluc_llull/ui-lib';

export interface HeroSectionI {
    pretitle?: string;
    title?: string;
    subtitle?: string;
    text?: string;
    buttons?: UiLibButtonI[];
    highlight?: string;
}
