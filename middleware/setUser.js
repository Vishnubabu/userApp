const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const token = req.cookies[config.auth.cookie_name];
    if (!token) {
        return next();
    }

    jwt.verify(token, config.auth.secret, (err, user) => {
        if (err) {
            //TODO log err
            res.clearCookie(config.auth.cookie_name);
            return next();
        }

        res.locals.user = user;
        next();
    });

};
