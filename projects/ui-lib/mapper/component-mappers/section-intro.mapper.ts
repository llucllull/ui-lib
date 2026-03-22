import { mapButtons } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapSectionIntro: ComponentMapperFn = (props) => ({
    pretitle: props?.texts?.pretitle,
    title: props?.texts?.title,
    subtitle: props?.texts?.subtitle,
    text: props?.texts?.text,
    button: mapButtons(props?.button)[0],
});
