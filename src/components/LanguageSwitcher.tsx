'use client';

import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/request';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const currentLocale = (params.locale as Locale) || 'en';

  const switchLanguage = (newLocale: Locale) => {
    // Get current pathname without locale prefix
    const segments = pathname.split('/');
    
    // Remove current locale from path (first segment after /)
    if (locales.includes(segments[1] as Locale)) {
      segments.splice(1, 1);
    }
    
    // Build new path with new locale
    const newPath = `/${newLocale}${segments.join('/')}`;
    
    // Navigate to new locale path
    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={currentLocale}
        onChange={(e) => switchLanguage(e.target.value as Locale)}
        className="block w-full px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
