const router = require('express').Router();

router.get('/', (req, res, next) => {
    if (!res.locals.user) { // not logged in
        return res.status(403).end();
    }

    res.send(res.locals.user);
});

module.exports = router;
