const router = require('express').Router();

router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/user-details', require('./userDetails'));
router.use('/reading-preference', require('./readingPreference'));

module.exports = router;
