import { UiLibButtonI } from "@lluc_llull/ui-lib/interfaces";
import { SplitShowcaseMetaItemI } from "./split-showcase.component";

export interface SplitShowcaseI {
    title: string;
    subtitle: string;
    description: string;
    metas: SplitShowcaseMetaItemI[];
    buttons?: UiLibButtonI[];
}