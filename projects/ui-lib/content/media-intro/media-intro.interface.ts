import { UiLibImageI } from "@lluc_llull/ui-lib/interfaces";

export interface MediaIntroI {
  highlightedText?: string;
  secondaryText?: string;
  direction: 'left' | 'right';
  media?: UiLibImageI;
}