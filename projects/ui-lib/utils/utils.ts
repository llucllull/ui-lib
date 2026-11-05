import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

export function mapButtons(data: any): UiLibButtonI[] {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item) => item && typeof item === 'object')
        .map((item): UiLibButtonI => {
            const labelValue = item.label ?? '';

            let finalUrl = '';
            if (item.link_type === 'internal') {
                finalUrl = item.page === 'home' ? '' : (item.page ?? '');
            } else {
                finalUrl = item.url ?? '';
            }

            return {
                label: labelValue,
                url: finalUrl,
                linkType: item.link_type ?? 'none',
                icon: item.icon,
            };
        });
}

export function mapImage(data: any, cdn?: string): UiLibImageI | null {
    if (!data || typeof data !== 'object') return null;

    const src = data.url ?? data.src ?? '';
    const fullUrl = src.startsWith('http') ? src : (cdn ?? '') + src;
    
    let publicId = data.public_id ?? data.publicId;

    if (!publicId && fullUrl.includes('cloudinary.com')) {
        const match = fullUrl.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
        if (match) {
            publicId = match[1];
        }
    }

    return {
        url: fullUrl,
        publicId: publicId,
        alt: data.alt ?? '',
        width: data.width,
        height: data.height,
        format: data.format,
        texts: {
            pretitle: data.texts?.pretitle,
            title: data.texts?.title,
            subtitle: data.texts?.subtitle,
            text: data.texts?.text,
        },
    };
}

export function mapImageOrGallery(data: any, cdn?: string): UiLibImageI[] {
    if (!data) return [];

    if (data.images && Array.isArray(data.images)) {
        data = data.images;
    }

    if (Array.isArray(data)) {
        return data
            .filter((img) => img && typeof img === 'object')
            .map((img) => mapImage(img, cdn))
            .filter((img): img is UiLibImageI => !!img);
    }

    const single = mapImage(data, cdn);
    return single ? [single] : [];
}