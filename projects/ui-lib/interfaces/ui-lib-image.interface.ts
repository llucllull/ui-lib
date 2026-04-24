import { UiLibTextsI } from "./ui-lib-texts.interface";

export interface UiLibImageI {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    format?: string;
    texts?: UiLibTextsI;
}
