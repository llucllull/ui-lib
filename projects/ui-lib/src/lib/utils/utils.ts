// utils.ts

export interface MappedButton {
    label: string;
    url: string;
    linkType: 'internal' | 'external' | 'scroll' | 'none';
    icon?: string;
}

export function mapButtons(data: any): MappedButton[] {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item) => item && typeof item === 'object')
        .map(
            (item): MappedButton => ({
                label: item.label ?? '',
                url: item.url ?? '#',
                linkType: item.linkType ?? 'none',
                icon: item.icon,
            })
        );
}

export interface MappedImage {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    format?: string;
}

export function mapImage(data: any): MappedImage | null {
    if (!data || typeof data !== 'object') return null;

    return {
        url: data.url ?? '',
        alt: data.alt ?? '',
        width: data.width,
        height: data.height,
        format: data.format,
    };
}

export function mapImageOrGallery(data: any): MappedImage[] {
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
