import { UiLibButtonI } from '../interfaces/ui-lib-button.interface';
import { UiLibImageI } from '../interfaces/ui-lib-image.interface';

export function mapButtons(data: any): UiLibButtonI[] {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item) => item && typeof item === 'object')
        .map(
            (item): UiLibButtonI => ({
                label: item.label ?? '',
                url: item.url ?? '#',
                linkType: item.link_type ?? 'none',
                icon: item.icon,
            }),
        );
}

export function mapImage(data: any, cdn?: string): UiLibImageI | null {
    if (!data || typeof data !== 'object') return null;

    const src = data.url ?? data.src ?? '';

    return {
        url: src.startsWith('http') ? src : (cdn ?? '') + src,
        alt: data.alt ?? '',
        width: data.width,
        height: data.height,
        format: data.format,
    };
}

export function mapImageOrGallery(data: any, cdn?: string): UiLibImageI[] {
    if (!data) return [];

    if (Array.isArray(data)) {
        return data
            .filter((img) => img && typeof img === 'object')
            .map((img) => mapImage(img, cdn)!)
            .filter(Boolean);
    }

    const single = mapImage(data, cdn);
    return single ? [single] : [];
}