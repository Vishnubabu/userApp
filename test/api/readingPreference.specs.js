/*global describe, it, before */

const userApp = require('../../app');
const expect = require('unexpected').clone()
    .installPlugin(require('unexpected-express'));
const express = require('express');

describe('API /reading-preference', () => {
    let cookie;

    before(() => {
        return expect(express().use(userApp), 'to yield exchange', {
            request: {
                url: '/api/login',
                method: 'POST',
                body: {
                    email: 'zola@gmail.com',
                    password: 'AMT25',
                }
            },

            response: 200

        }).then(context => {
            cookie = context.httpResponse.headers.valuesByName['set-cookie'].shift();
        });

    });

    it('should give the reading preference if user is logged in', () => {
        return expect(express().use(userApp), 'to yield exchange', {
            request: {
                url: '/api/reading-preference',
                method: 'GET',
                headers: {
                    cookie: cookie
                }
            },

            response: 200

        }).then(context => {
            const body = context.httpResponse.body;
            expect(body.length, 'to be', 5);
        });
    });

    it('should give permission denied if user is not logged in', () => {
        return expect(express().use(userApp), 'to yield exchange', {
            request: {
                url: '/api/reading-preference',
                method: 'GET'
            },

            response: 403
        });
    });
});
