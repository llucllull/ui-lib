import { mapButtons } from '@lluc_llull/ui-lib/utils';
import { ComponentMapperFn } from './types';

export const mapLinksFooter: ComponentMapperFn = (props) => ({
    links: mapButtons(props?.footer_links),
});
