import { UiLibAddressI } from '@lluc_llull/ui-lib/interfaces';
import { mapButtons, mapImage } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapVisualFooter: ComponentMapperFn = (props) => ({
    contactTitle: props?.texts?.contactTitle,
    contactPhone: mapButtons(props?.contactPhone),
    contactEmail: mapButtons(props?.contactEmail),
    addressTitle: props?.texts?.addressTitle,
    address: {
        address: props?.address?.address,
        city: props?.address?.city,
        country: props?.address?.country,
        cp: props?.address?.cp,
        province: props?.address?.province,
    } as UiLibAddressI,
    socialsTitle: props?.texts?.socialsTitle,
    socials: mapButtons(props?.social_links),
    image: mapImage(props?.multimedia),
});
