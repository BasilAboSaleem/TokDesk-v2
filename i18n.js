const i18next = require('i18next');


const enLanding = require('./locales/en/landing.json');
const enDashboard = require('./locales/en/dashboard.json');


const arLanding = require('./locales/ar/landing.json');
const arDashboard = require('./locales/ar/dashboard.json');

i18next.init({
  lng: 'en', 
  fallbackLng: 'en',
  ns: ['landing', 'dashboard'], 
  defaultNS: 'landing',         
  resources: {
    en: {
      landing: enLanding,
      dashboard: enDashboard
    },
    ar: {
      landing: arLanding,
      dashboard: arDashboard
    }
  }
});

module.exports = i18next;
