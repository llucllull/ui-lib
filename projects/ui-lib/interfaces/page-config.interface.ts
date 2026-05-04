export interface BodyComponent<T> {
    name: string;
    order?: number;
    props: T;
    events?: Record<string, (...args: any[]) => void>;
}
export interface PageComponent {
    id: number;
    page_id: number;
    component_id: number;
    order: number;
    component?: {
        name: string;
    };
}

export interface PageComponentTranslation {
    id: number;
    page_component_id: number;
    lang_id: number;
    props: any;
    page_component?: PageComponent;
}
