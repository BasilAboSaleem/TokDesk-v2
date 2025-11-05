const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'ar'],
  directory: path.join(process.cwd(), 'locales'), 
  defaultLocale: 'en',
  queryParameter: 'lang',
  objectNotation: true,
  autoReload: true,
  updateFiles: false,
  syncFiles: false,
});

module.exports = (app) => {
  app.use(i18n.init);
  app.use((req, res, next) => {
    res.locals.__ = res.__;
    res.locals.locale = req.getLocale();
    res.locals.dir = req.getLocale() === 'ar' ? 'rtl' : 'ltr';
    next();
  });
};
