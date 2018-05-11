const router = require('express').Router();
const config = require('../config');

router.post('/', (req, res, next) => {
    res.clearCookie(config.auth.cookie_name);
    res.send({status: 'ok'});
});

module.exports = router;
