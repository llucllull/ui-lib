import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Ui-Kit',
    brandUrl: 'https://llucllull.dev',
    // brandImage: 'https://ujpxanmobdxrwjsndrzq.supabase.co/storage/v1/object/public/branding/logos/logo-primary.svg',
    brandTarget: '_self',
  }),
});
