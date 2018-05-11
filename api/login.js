const router = require('express').Router();
const { body: check, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody: sanitize } = require('express-validator/filter');
const jwt = require('jsonwebtoken');
const userDal = require('../dal/user');
const config = require('../config');
const userModel = require('../model/user');

const validator = [
    sanitize('email').trim(),
    sanitize('password').trim(),

    check('password').not().isEmpty().withMessage('empty password'),
    check('email').isEmail().withMessage('wrong email')
];

router.post('/', validator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    const params = matchedData(req);
    const user = userDal.getUserByEmail(params.email);

    if (!user) {
        return res.status(400).json({ error: 'no email exists' });
    }

    if (user.password !== params.password) {
        return res.status(400).json({ error: 'wrong password' });
    }

    const cookie = jwt.sign(userModel(user), config.auth.secret);

    res.cookie(config.auth.cookie_name, cookie, {maxAge: config.auth.max_age });
    res.send({status: 'ok'});
});

module.exports = router;
