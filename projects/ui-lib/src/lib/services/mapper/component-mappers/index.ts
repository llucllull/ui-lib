import { mapHeaderClear } from './header-clear.mapper';
import { mapHeroSection } from './hero-section.mapper';
import { mapLangModal } from './lang-modal.mapper';
import { mapNavModal } from './nav-modal.mapper';

export const componentMappers: Record<string, (props: any) => any> = {
    'hero-section': mapHeroSection,
    'header-clear': mapHeaderClear,
    'nav-modal': mapNavModal,
    'lang-modal': mapLangModal,
};
