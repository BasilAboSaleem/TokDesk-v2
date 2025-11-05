// config/i18n.js
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const path = require('path');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    preload: ['en', 'ar'],
    ns: [
      'common',
      'landing', 
      'auth',
      'dashboard',
      'admin',
      'modules/billing',
      'modules/reports',
      'modules/analytics'
    ],
    defaultNS: 'common',
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json')
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie'],
      lookupQuerystring: 'lang',
      lookupCookie: 'locale',
      cookieMinutes: 525600, // 1 year
    },
    interpolation: {
      escapeValue: false
    },
    saveMissing: true,
    parseMissingKeyHandler: (key) => {
      console.warn(`MISSING TRANSLATION: ${key}`);
      return key;
    }
  });

module.exports = i18next;