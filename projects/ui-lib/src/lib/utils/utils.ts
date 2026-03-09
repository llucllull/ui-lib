import { inject } from '@angular/core';
import { UiLibButtonI } from '../interfaces/ui-lib-button.interface';
import { UiLibImageI } from '../interfaces/ui-lib-image.interface';
import { CDN_BASE_URL } from '../services/mapper/cdn.token';

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

export function mapImage(data: any): UiLibImageI | null {
    if (!data || typeof data !== 'object') return null;

    const cdn = inject(CDN_BASE_URL, { optional: true });

    const src = data.url ?? data.src ?? '';

    return {
        url: src.startsWith('http') ? src : (cdn ?? '') + src,
        alt: data.alt ?? '',
        width: data.width,
        height: data.height,
        format: data.format,
    };
}

export function mapImageOrGallery(data: any): UiLibImageI[] {
    if (!data) return [];

    // Si es array → galería
    if (Array.isArray(data)) {
        return data
            .filter((img) => img && typeof img === 'object')
            .map((img) => mapImage(img)!)
            .filter(Boolean);
    }

    // Si es objeto → imagen única
    const single = mapImage(data);
    return single ? [single] : [];
}
