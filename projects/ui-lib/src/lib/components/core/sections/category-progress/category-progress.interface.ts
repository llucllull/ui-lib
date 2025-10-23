import { ProgressCategoryI } from "./category-progress.component";

export interface CategoryProgressI {
  pretitle?: string;
  title?: string;
  categories?: ProgressCategoryI[];
}