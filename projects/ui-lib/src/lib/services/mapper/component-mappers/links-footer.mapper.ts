import { mapButtons } from '../../../utils/utils';
import { ComponentMapperFn } from './types';

export const mapLinksFooter: ComponentMapperFn = (props) => ({
    links: mapButtons(props?.footer_links),
});
