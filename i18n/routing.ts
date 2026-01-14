import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // All supported locales
  locales: ['en', 'zh-TW', 'zh-CN'],
  
  // Default locale
  defaultLocale: 'en',
  
  // Always show locale prefix in URL
  localePrefix: 'always'
});
