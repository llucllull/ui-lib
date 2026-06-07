import { UiLibImageI } from "@lluc_llull/ui-lib/interfaces";

export interface ColumnsMediaStackedI {
  leftColumn?: string;
  rightColumn?: string;
  direction: 'left' | 'right';
  image?: UiLibImageI;
}