// app/middlewares/i18n.js
const i18next = require('../../config/i18n');
const middleware = require('i18next-http-middleware');

module.exports = (app) => {
  app.use(middleware.handle(i18next));
  
  app.use((req, res, next) => {
    res.locals.t = req.t;
    res.locals.locale = req.language;
    res.locals.dir = req.language === 'ar' ? 'rtl' : 'ltr';
    res.locals.isRTL = req.language === 'ar';
    
    next();
  });
};