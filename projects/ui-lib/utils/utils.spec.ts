import { mapButtons, mapImage, mapImageOrGallery } from './utils';
import { LinkType } from '@lluc_llull/ui-lib/enums';

describe('mapping utilities', () => {
  it('maps internal and external buttons and ignores invalid entries', () => {
    expect(mapButtons(undefined)).toEqual([]);
    expect(mapButtons([null, 'invalid', { label: 'Home', link_type: 'internal', page: 'home' }, { label: 'Docs', url: '/docs', link_type: 'external' }])).toEqual([
      { label: 'Home', url: '', linkType: LinkType.Internal, icon: undefined },
      { label: 'Docs', url: '/docs', linkType: LinkType.External, icon: undefined },
    ]);
  });

  it('normalizes image URLs and extracts Cloudinary public IDs', () => {
    expect(mapImage(null)).toBeNull();
    expect(mapImage({ src: '/photo.jpg', alt: 'Photo' }, 'https://cdn.test')).toEqual(jasmine.objectContaining({ url: 'https://cdn.test/photo.jpg', alt: 'Photo' }));
    expect(mapImage({ url: 'https://res.cloudinary.com/demo/image/upload/v1/folder/photo.jpg' })!.publicId).toBe('folder/photo');
    expect(mapImage({ publicId: 'manual', url: '/photo.jpg' })!.publicId).toBe('manual');
  });

  it('supports gallery wrappers, arrays and empty values', () => {
    expect(mapImageOrGallery(undefined)).toEqual([]);
    expect(mapImageOrGallery({ images: [{ url: '/one.jpg' }, null] }, 'cdn/').length).toBe(1);
    expect(mapImageOrGallery({ url: '/single.jpg' }, 'cdn/')[0].url).toBe('cdn//single.jpg');
  });
});
