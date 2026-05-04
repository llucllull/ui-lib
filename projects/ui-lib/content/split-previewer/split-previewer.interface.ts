import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { SplitPreviewerItemI } from './split-previewer.component';

export interface SplitPreviewerI {
    title?: string;
    items?: SplitPreviewerItemI[];
    imageDefault?: UiLibImageI;
    direction: 'left' | 'right';
}
