import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Ui-Lib Components',
    brandUrl: 'https://portfoli-y7tp.onrender.com/es',
    // brandImage: 'https://ujpxanmobdxrwjsndrzq.supabase.co/storage/v1/object/public/branding/logos/logo-primary.svg',
    brandTarget: '_self',
  }),
});
