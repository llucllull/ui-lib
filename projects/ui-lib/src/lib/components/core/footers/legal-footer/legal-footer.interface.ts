import { UiLibButtonI } from "../../../../interfaces";
import { LegalFooterVariant } from "./legal-footer.component";

export interface LegalFooterI {
  year?: number;
  brand?: string;
  credits?: string;
  links?: UiLibButtonI[];
  variant: LegalFooterVariant;
}