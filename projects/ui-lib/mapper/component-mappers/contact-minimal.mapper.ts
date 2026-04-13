import { mapButtons } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapContactMinimal: ComponentMapperFn = (props) => ({
    contactsTitle: props?.texts?.contactsTitle,
    socialsTitle: props?.texts?.socialsTitle,
    contacts: mapButtons(props?.items?.[0]?.buttons),
    socials: mapButtons(props?.items?.[1]?.buttons),
});
