import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load and merge all translation files for the locale
  const [common, home, about, contact, support, products] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/about.json`),
    import(`../messages/${locale}/contact.json`),
    import(`../messages/${locale}/support.json`),
    import(`../messages/${locale}/products.json`),
  ]);

  // Merge all translation files into a single messages object
  const messages = {
    ...common.default,
    ...home.default,
    ...about.default,
    ...contact.default,
    ...support.default,
    ...products.default,
  };

  return {
    locale,
    messages,
  };
});

// Export for use in components
export const { locales, defaultLocale } = routing;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
};
