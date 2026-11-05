import {
  map404,
  mapAsymmetricMedia,
  mapCategoryProgress,
  mapColumnsFooter,
  mapColumnsMediaStacked,
  mapContactMinimal,
  mapContentDocument,
  mapHeaderClear,
  mapHeroSection,
  mapLangModal,
  mapLegalFooter,
  mapLinksFooter,
  mapMediaIntro,
  mapMediaSplit,
  mapMosaicGrid,
  mapMosaicParallax,
  mapNavModal,
  mapSectionIntro,
  mapSocialFooter,
  mapSplitPreviewer,
  mapSplitShowcase,
  mapStackedRows,
  mapVisualFooter,
  mapSocialLinks,
} from './index';

describe('component mappers', () => {
  const image = { url: '/image.jpg', alt: 'Image' };
  const button = { label: 'Open', url: '/open', link_type: 'internal' };

  it('maps simple text components', () => {
    expect(map404({ texts: { title: '404', subtitle: 'Missing', highlight: 'Oops' }, buttons: [button] }).title).toBe('404');
    expect(mapCategoryProgress({ texts: { pretitle: 'Skills', title: 'Progress' }, items: [{ title: 'Web', items: [{ name: 'Angular', progress: 80 }] }] }).categories[0].items[0]).toEqual({ label: 'Angular', value: 80 });
    expect(mapContentDocument({ texts: { title: 'Docs' }, items: [{ title: 'One', text: 'Text' }] }).items[0]).toEqual({ title: 'One', text: 'Text' });
    expect(mapSectionIntro({ texts: { pretitle: 'Pre', title: 'Title', subtitle: 'Sub', text: 'Text' }, buttons: [button] }).button.label).toBe('Open');
    expect(mapStackedRows({ texts: { title: 'Rows', text: 'Intro' }, items: [{ title: 'Row', text: 'Value' }] }).items[0].title).toBe('Row');
    expect(mapSplitShowcase({ texts: { title: 'Showcase' }, meta: [{ label: 'Type', value: 'Web' }], buttons: [button] }).metas[0].value).toBe('Web');
  });

  it('maps media components and passes the CDN through', () => {
    expect(mapAsymmetricMedia({ multimedia: { images: [image] }, direction: 'left' }, 'https://cdn.test').media[0].url).toBe('https://cdn.test/image.jpg');
    expect(mapColumnsMediaStacked({ texts: { leftColumn: 'L', rightColumn: 'R' }, multimedia: { image } }, 'https://cdn.test').image.alt).toBe('Image');
    expect(mapMediaIntro({ texts: { highlightedText: 'Main' }, multimedia: { image } }, 'https://cdn.test').media.publicId).toBeUndefined();
    expect(mapMediaSplit({ texts: { title: 'Media' }, multimedia: { images: [image] } }, 'https://cdn.test').images.length).toBe(1);
    expect(mapMosaicGrid({ texts: { editorialText: 'Grid' }, multimedia: { images: [image] } }, 'https://cdn.test').text).toBe('Grid');
    expect(mapMosaicParallax({ texts: { title: 'Mosaic' }, multimedia: { images: [image] } }, 'https://cdn.test').images[0].alt).toBe('Image');
    expect(mapSocialFooter({ multimedia: [image], social_links: [button], texts: { hashtag: '#test' } }).hashtag).toBe('#test');
    expect(mapVisualFooter({ texts: { contactTitle: 'Contact' }, contactPhone: [button], multimedia: image }).contactTitle).toBe('Contact');
  });

  it('maps navigation, language and previewer data', () => {
    const navigation = { items: [{ slug: 'home', label: { es: 'Inicio' } }, { slug: 'about', label: { en: 'About' } }], social: [{ label: 'GitHub', url: 'https://github.com' }] };
    expect(mapNavModal(navigation, 'es')[0].url).toBe('/es');
    expect(mapNavModal(navigation, 'en')[1].label).toBe('About');
    expect(mapNavModal(undefined, 'es')).toEqual([]);
    expect(mapSocialLinks(navigation)[0].order).toBe(0);
    expect(mapSocialLinks(undefined)).toEqual([]);
    expect(mapLangModal([{ id: 4, code: 'es', labels: { es: 'Español' } }, { code: 'en' }], 'es')[1].label).toBe('en');
    expect(mapLangModal(undefined as any)).toEqual([]);
    expect(mapHeaderClear({ logo: image, navigation, buttons: [button] }, 'https://cdn.test').lang).toBe('es');
    expect(mapHeroSection({ variant: 'image', texts: { title: 'Hero' }, multimedia: { image }, buttons: [button] }, 'https://cdn.test').variant).toBe('image');
    expect(mapSplitPreviewer({ texts: { title: 'Preview' }, items: [{ title: 'Item', multimedia: { image }, buttons: [button] }], multimedia: { image } }, 'https://cdn.test').items[0].title).toBe('Item');
  });

  it('maps footer columns and handles absent collections', () => {
    expect(mapColumnsFooter({ columns: [{ texts: { title: 'A' }, buttons: [button] }], copyright: { texts: { year: '2026' } } }).columns[0].items[0].label).toBe('Open');
    expect(mapLegalFooter({ texts: { brand: 'Brand' }, footer_links: [button] }).brand).toBe('Brand');
    expect(mapLinksFooter({ footer_links: [button] }).links.length).toBe(1);
    expect(mapColumnsFooter(undefined).columns).toBeUndefined();
  });
});
