const config = require('./config');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const setUser = require('./middleware/setUser');
const app = express();

app
    .use(cookieParser())
    .use(bodyParser.json({ limit: '5mb' }))
    .use(setUser);

app.use(require('./routes'));

app.set('etag', false); //to avoid client caching of api response

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(config.server.host);

module.exports = app;
