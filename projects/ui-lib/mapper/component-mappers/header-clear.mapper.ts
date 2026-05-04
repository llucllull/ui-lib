import { mapImage, mapButtons } from '@lluc_llull/ui-lib/utils';
import { mapSocialLinks } from './nav-modal.mapper';
import { ComponentMapperFn } from './types';

export const mapHeaderClear: ComponentMapperFn = (props, cdn) => {
    return {
        logo: mapImage(props?.logo, cdn),
        logoDark: mapImage(props?.logoDark, cdn),
        lang: props?.lang || 'es',
        navigation: props?.navigation,
        socialItems: mapSocialLinks(props?.navigation),
        homeLink: mapButtons(props?.buttons)[0],
    };
};
