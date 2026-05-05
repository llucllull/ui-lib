import { UiLibTextsI } from "./ui-lib-texts.interface";

export interface UiLibImageI {
    url: string;
    publicId?: string; // Used for Cloudinary images
    alt: string;
    width?: number;
    height?: number;
    format?: string;
    texts?: UiLibTextsI;
}
