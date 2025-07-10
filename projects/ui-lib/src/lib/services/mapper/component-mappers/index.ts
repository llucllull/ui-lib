import { mapTopSlider } from './top-slider.mapper';
// importa más mappers aquí...

export const componentMappers: Record<string, (props: any) => any> = {
    'top-slider': mapTopSlider,
    // añade los demás
};
