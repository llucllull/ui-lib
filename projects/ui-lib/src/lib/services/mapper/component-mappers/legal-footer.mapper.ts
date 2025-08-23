import { mapButtons } from '../../../utils/utils';
import { ComponentMapperFn } from './types';

export const mapLegalFooter: ComponentMapperFn = (props) => ({ 
    year: props?.texts?.year,
    brand: props?.texts?.brand,
    credits: props?.texts?.credits,
    links: mapButtons(props?.footer_links),
    //variant
});