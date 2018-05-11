const googleAPI = require('../modules/googleAPI');
const router = require('express').Router();

router.get('/', (req, res, next) => {
    if (!res.locals.user) { // not logged in
        return res.status(403).end();
    }

    googleAPI()
    .then(result => res.send(result))
    .catch(next);
});

module.exports = router;
