export interface BodyComponent<T> {
    name: string;
    order?: number;
    props: T;
}
export interface PageComponent {
    id: number;
    page_id: number;
    component_id: number;
    order: number;
}

export interface PageComponentTranslation {
    id: number;
    page_component_id: number;
    lang_id: number;
    props: any;
    page_component?: PageComponent;
}
