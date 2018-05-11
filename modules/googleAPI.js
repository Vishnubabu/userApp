const request = require('request');
const cache = require('../modules/cache');
const config = require('../config');
const {promisify} = require('util');
const asyncGet = promisify(request.get);
const bookModel = require('../model/book');

module.exports = async () => {   // since async fn, errors are handled in catch of caller
    const input = {url: config.googleAPI.endpoint, json: true};

    let response = await cache.get(input);
    if (response) {
        return response;
    }

    response = await asyncGet(input);
    if (response.statusCode !== 200) {
        throw 'ERR: ' + JSON.stringify(response);
    }

    response = response.body.items.slice(0, config.googleAPI.maxResults).map(bookModel);
    cache.set(input, response, config.googleAPI.cache_ttl);
    return response;
};
