export * from './404.mapper';
export * from './category-progress.mapper';
export * from './contact-minimal.mapper';
export * from './header-clear.mapper';
export * from './hero-section.mapper';
export * from './lang-modal.mapper';
export * from './legal-footer.mapper';
export * from './links-footer.mapper';
export * from './nav-modal.mapper';
export * from './section-intro.mapper';
export * from './social-footer.mapper';
export * from './split-previewer.mapper';
export * from './visual-footer.mapper';
export * from './media-split.mapper';
export * from './stacked-rows.mapper';
export * from './mosaic-parallax.mapper';
export * from './content-document.mapper';
export * from './columns-footer.mapper';
export * from './split-showcase.mapper';

import { map404 } from './404.mapper';
import { mapCategoryProgress } from './category-progress.mapper';
import { mapContactMinimal } from './contact-minimal.mapper';
import { mapHeaderClear } from './header-clear.mapper';
import { mapHeroSection } from './hero-section.mapper';
import { mapLangModal } from './lang-modal.mapper';
import { mapLegalFooter } from './legal-footer.mapper';
import { mapLinksFooter } from './links-footer.mapper';
import { mapMediaSplit } from './media-split.mapper';
import { mapSectionIntro } from './section-intro.mapper';
import { mapSocialFooter } from './social-footer.mapper';
import { mapSplitPreviewer } from './split-previewer.mapper';
import { mapStackedRows } from './stacked-rows.mapper';
import { mapVisualFooter } from './visual-footer.mapper';
import { mapMosaicParallax } from './mosaic-parallax.mapper';
import { mapContentDocument } from './content-document.mapper';
import { mapColumnsFooter } from './columns-footer.mapper';
import { mapSplitShowcase } from './split-showcase.mapper';

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
    'split-previewer': mapSplitPreviewer,
    'contact-minimal': mapContactMinimal,
    'media-split': mapMediaSplit,
    'stacked-rows': mapStackedRows,
    'mosaic-parallax': mapMosaicParallax,
    'content-document': mapContentDocument,
    'columns-footer': mapColumnsFooter,
    'split-showcase': mapSplitShowcase,
};
