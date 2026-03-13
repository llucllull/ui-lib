import { mapCategoryProgress } from './category-progress.mapper';
import { mapHeaderClear } from './header-clear.mapper';
import { mapHeroSection } from './hero-section.mapper';
import { mapLangModal } from './lang-modal.mapper';
import { mapLegalFooter } from './legal-footer.mapper';
import { mapLinksFooter } from './links-footer.mapper';
import { map404 } from './404.mapper';
import { mapSectionIntro } from './section-intro.mapper';
import { mapSocialFooter } from './social-footer.mapper';
import { mapVisualFooter } from './visual-footer.mapper';

export const componentMappers: Record<string, (props: any, cdn?: string) => any> = {
    'hero-section': mapHeroSection,
    'header-clear': mapHeaderClear,
    'lang-modal': mapLangModal,
    'section-intro': mapSectionIntro,
    'category-progress': mapCategoryProgress,
    'links-footer': mapLinksFooter,
    'legal-footer': mapLegalFooter,
    'social-footer': mapSocialFooter,
    'visual-footer': mapVisualFooter,
    'not-found': map404,
};
