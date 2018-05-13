/*global describe, it, before */

const userApp = require('../../app');
const expect = require('unexpected').clone()
    .installPlugin(require('unexpected-express'));
const express = require('express');

describe('API /logout', () => {
    let cookie;

    before(() => {
        return expect(express().use(userApp), 'to yield exchange', {
            request: {
                url: '/api/login',
                method: 'POST',
                body: {
                    email: 'tony@gmail.com',
                    password: 'DBOcK',
                }
            },

            response: 200

        }).then(context => {
            cookie = context.httpResponse.headers.valuesByName['set-cookie'].shift();
        });

    });

    it('should logout the user', () => {
        return expect(express().use(userApp), 'to yield exchange', {
            request: {
                url: '/api/logout',
                method: 'POST',
                headers: {
                    cookie: cookie
                }
            },

            response: 200

        }).then(context => {
            const body = context.httpResponse.body;
            expect(body.status, 'to be', 'ok');
        });
    });
});



