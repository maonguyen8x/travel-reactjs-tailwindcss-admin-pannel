import I18n from 'i18n-js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const en = require('./locales/en.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vi = require('./locales/vi.json');

const defaultLocale = 'en';
const localeKeys = Object.keys(en);

I18n.fallbacks = true;
I18n.defaultLocale = defaultLocale;
I18n.locale = defaultLocale;
// choose a different default separator
// so it's allowed to use dots in i18n keys
I18n.defaultSeparator = '/';
I18n.translations = {
  en,
  vi,
};
const t = (key?: string, params?: any): any => {
  // empty key
  if (!key) return '';

  if (/^.*\.$/g.test(key.trim())) {
    // eslint-disable-next-line no-console
    console.info(`Ignore an incomplete key ${key}`);

    return '';
  }

  // not existing key
  if (!localeKeys.includes(key)) {
    if (process.env.NODE_ENV === 'test') {
      return I18n.t(key, params);
    }
    // eslint-disable-next-line no-console
    console.warn('Missing key', key);
  }

  return I18n.t(key, params);
};
const getOtherLanguage = (language: string) => {
  if (language.toLowerCase() === 'en') {
    return 'vi';
  }

  return 'en';
};
const setLocale = (locale: string) => {
  I18n.defaultLocale = locale;
  I18n.locale = locale;
};

export { t, setLocale, getOtherLanguage };
export default I18n;
