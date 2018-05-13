import express from 'express';
import serverRenderer from './middleware/renderer';
const {api_path: apiPath, target: apiTarget} = require('../package.json').proxy;

const PORT = 3000;
const path = require('path');
const proxy = require('express-http-proxy');

// initialize the application and create the routes
const app = express();
const router = express.Router();

router.use(apiPath, proxy(apiTarget, {
    proxyReqPathResolver: function (req) {
        return apiPath + req.url;
    }
}));

// routes that require SSR
router.use(/^\/(details|login)?$/, serverRenderer);

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

// tell the app to use the above rules
app.use(router);

// start the app
app.listen(PORT, (error) => {
    if (error) {
        return console.log('something bad happened', error);
    }

    console.log("listening on " + PORT + "...");
});
