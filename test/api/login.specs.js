/*global describe, it */

const userApp = require('../../app');
const expect = require('unexpected').clone()
    .installPlugin(require('unexpected-express'));
const express = require('express');

describe('API /login', () => {
    it('should login the user if correct email & password', () => {
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
            const body = context.httpResponse.body;
            expect(body.status, 'to be', 'ok');
        });
    });

    it('should give error if incorrect email or password', () => {
        return expect(express().use(userApp), 'to yield exchange', {
            request: {
                url: '/api/login',
                method: 'POST',
                body: {
                    email: 'wrong-email@gmail.com',
                    password: 'wrong-passwd',
                }
            },

            response: 400
        });
    });

    it('should give error if empty email or password', () => {
        return expect(express().use(userApp), 'to yield exchange', {
            request: {
                url: '/api/login',
                method: 'POST',
                body: {
                    email: '',
                    password: 'wrong-passwd',
                }
            },

            response: 422
        });
    });

});
