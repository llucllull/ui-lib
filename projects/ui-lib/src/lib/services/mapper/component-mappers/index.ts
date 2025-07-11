import { mapHeroSection } from './hero-section.mapper';
// importa más mappers aquí...

export const componentMappers: Record<string, (props: any) => any> = {
    'hero-section': mapHeroSection,
};
