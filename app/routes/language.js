// app/routes/language.js
const express = require("express");
const router = express.Router();

router.post('/change-language', (req, res) => {
  const { lang } = req.body;
  
  if (['en', 'ar'].includes(lang)) {
    res.cookie('locale', lang, { 
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true 
    });
    
    i18next.changeLanguage(lang);
  }
  
  res.redirect('back');
});




module.exports = router;