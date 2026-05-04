import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

export interface HeroSectionI {
    variant: 'text' | 'image';
    pretitle?: string;
    title?: string;
    subtitle?: string;
    text?: string;
    buttons?: UiLibButtonI[];
    highlight?: string;
    image?: UiLibImageI;
}
