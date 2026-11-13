import { LinkType } from '@lluc_llull/ui-lib/enums';
import type {
    UiLibButtonI,
    UiLibImageI,
    UiLibNavItemsI,
    UiLibSocialItemsI,
} from '@lluc_llull/ui-lib/interfaces';

/**
 * Todos los assets de las stories viven en `src/lib/assets/storybook`
 * y se sirven bajo `/assets` gracias a `staticDirs` (.storybook/main.ts).
 * Así ninguna story depende de picsum, placehold o del CDN de producción.
 */
export const ASSET_BASE = '/assets/storybook';

export const image = (file: string, alt: string, width?: number, height?: number): UiLibImageI => ({
    url: `${ASSET_BASE}/${file}`,
    alt,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
});

export const gallery = (files: readonly string[], altPrefix = 'Imagen'): UiLibImageI[] =>
    files.map((file, index) => image(file, `${altPrefix} ${index + 1}`));

export const external = (
    label: string,
    url = 'https://example.com',
    icon = 'arrow-right',
): UiLibButtonI => ({ label, url, icon, linkType: LinkType.External });

export const internal = (label: string, url: string, icon = 'arrow-right'): UiLibButtonI => ({
    label,
    url,
    icon,
    linkType: LinkType.Internal,
});

export const mailto = (label: string, address = 'hola@llucllull.dev'): UiLibButtonI => ({
    label,
    url: `mailto:${address}`,
    icon: 'mail',
    linkType: LinkType.External,
});

export const tel = (label: string, number = '+34600000000'): UiLibButtonI => ({
    label,
    url: `tel:${number}`,
    icon: 'arrow-up-right',
    linkType: LinkType.External,
});

/* -------------------------------------------------------------------------- */
/*                              Imágenes base                                 */
/* -------------------------------------------------------------------------- */

export const heroImage = image('hero-01.svg', 'Home del producto en escritorio', 1600, 900);
export const heroDarkImage = image('hero-02.svg', 'Home del producto en tema oscuro', 1600, 900);
export const mobileImage = image('mobile-01.svg', 'Vista móvil del producto', 900, 1200);
export const portraitImage = image('portrait-01.svg', 'Composición editorial vertical', 1000, 1250);
export const landscapeImage = image('landscape-01.svg', 'Detalle de una sección', 1600, 900);
export const wideImage = image('wide-01.svg', 'Diagrama de arquitectura', 2000, 1000);
export const squareImage = image('square-01.svg', 'Detalle de interfaz', 1000, 1000);
export const detailImage = image('detail-01.svg', 'Estados e interacción', 1200, 800);
export const contactImage = image('contact-01.svg', 'Formulario de contacto', 1300, 900);
export const footerImage = image('footer-01.svg', 'Sección visual de cierre', 1300, 870);
export const avatarImage = image('avatar-01.svg', 'Retrato de ejemplo', 600, 600);

export const editorialFiles = [
    'editorial-01.svg',
    'editorial-02.svg',
    'editorial-03.svg',
    'editorial-04.svg',
    'editorial-05.svg',
    'editorial-06.svg',
    'editorial-07.svg',
    'editorial-08.svg',
] as const;

export const editorialImages = gallery(editorialFiles, 'Captura editorial');

export const tileFiles = [
    'tile-01.svg',
    'tile-02.svg',
    'tile-03.svg',
    'tile-04.svg',
    'tile-05.svg',
    'tile-06.svg',
] as const;

export const tileImages = gallery(tileFiles, 'Mosaico');

/** Repite un set de imágenes hasta alcanzar `count`. */
export const repeatImages = (
    files: readonly string[],
    count: number,
    altPrefix = 'Imagen',
): UiLibImageI[] =>
    Array.from({ length: count }, (_, index) =>
        image(files[index % files.length], `${altPrefix} ${index + 1}`),
    );

/* -------------------------------------------------------------------------- */
/*                                  Navegación                                */
/* -------------------------------------------------------------------------- */

export const brandLogos = {
    light: image('mark-dark.svg', 'Lluc Llull', 80, 80),
    dark: image('mark-light.svg', 'Lluc Llull', 80, 80),
};

export const navigation = {
    items: [
        { slug: 'home', label: { es: 'Inicio', ca: 'Inici', en: 'Home' } },
        { slug: 'projects', label: { es: 'Proyectos', ca: 'Projectes', en: 'Projects' } },
        { slug: 'about', label: { es: 'Sobre mí', ca: 'Sobre mi', en: 'About' } },
        { slug: 'contact', label: { es: 'Contacto', ca: 'Contacte', en: 'Contact' } },
    ],
};

export const navItems: UiLibNavItemsI[] = navigation.items.map((item) => ({
    label: item.label.es,
    url: `/${item.slug === 'home' ? 'es' : `es/${item.slug}`}`,
    linkType: LinkType.Internal,
    name: item.slug,
    active: true,
}));

export const socialItems: UiLibSocialItemsI[] = [
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/lluc-llull/',
        linkType: LinkType.External,
        icon: 'linkedin',
        order: 0,
    },
    {
        label: 'GitHub',
        url: 'https://github.com/llucllull',
        linkType: LinkType.External,
        icon: 'github',
        order: 1,
    },
    {
        label: 'Email',
        url: 'mailto:hola@llucllull.dev',
        linkType: LinkType.External,
        icon: 'mail',
        order: 2,
    },
];

export const homeLink: UiLibButtonI = internal('Inicio', '/es', 'home');
