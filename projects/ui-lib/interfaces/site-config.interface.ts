export interface GeneralConfigResponse {
    id: number;
    name: string;
    favicons: string | null;
    languages: {
        id: number;
        code: string;
    }[];
    logos: string | null;
    pages: Page[];
    theme: string;
}

export interface Page {
    id: number;
    name: string;
    template: string;
}

export interface Language {
    id: number;
    code: string;
}
