import { UiLibButtonI, UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

export function mapButtons(data: any, lang: string = 'es'): UiLibButtonI[] {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item) => item && typeof item === 'object')
        .map((item): UiLibButtonI => {
            // 1. Gestión de etiquetas bilingües
            const labelValue =
                item.label && typeof item.label === 'object'
                    ? (item.label[lang] ?? item.label['es'] ?? '')
                    : (item.label ?? '');

            // 2. Limpieza de 'home' y construcción de URL interna
            let finalUrl = '';
            if (item.link_type === 'internal') {
                const slug = item.page === 'home' ? '' : (item.page ?? '');
                finalUrl = slug === '' ? `/${lang}` : `/${lang}/${slug}`;
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

    return {
        url: src.startsWith('http') ? src : (cdn ?? '') + src,
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