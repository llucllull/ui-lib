import { mapImage } from '../../../utils/utils';
import { mapNavModalWithLang, mapSocialLinks } from './nav-modal.mapper';
import { ComponentMapperFn } from './types';

export const mapHeaderClear: ComponentMapperFn = (props, cdn) => {
    const currentLang = props?.lang || 'es';

    const navItems = mapNavModalWithLang(
        props?.['nav-modal']?.navLinks || [],
        currentLang
    );

    const socialItems = mapSocialLinks(
        props?.['nav-modal']?.socialLinks || []
    );

    return {
        logo: mapImage(props?.logo, cdn),
        logoDark: mapImage(props?.logoDark, cdn),
        lang: currentLang,
        navItems,
        socialItems,
        homeLink: navItems[0],
    };
};