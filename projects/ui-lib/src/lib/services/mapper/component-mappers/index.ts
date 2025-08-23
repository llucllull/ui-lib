import { mapCategoryProgress } from './category-progress.mapper';
import { mapHeaderClear } from './header-clear.mapper';
import { mapHeroSection } from './hero-section.mapper';
import { mapLangModal } from './lang-modal.mapper';
import { mapLinksFooter } from './links-footer.mapper';
import { mapNavModal } from './nav-modal.mapper';
import { mapSectionIntro } from './section-intro.mapper';

export const componentMappers: Record<string, (props: any) => any> = {
    'hero-section': mapHeroSection,
    'header-clear': mapHeaderClear,
    'nav-modal': mapNavModal,
    'lang-modal': mapLangModal,
    'section-intro': mapSectionIntro,
    'category-progress': mapCategoryProgress,
    'links-footer': mapLinksFooter,
};
