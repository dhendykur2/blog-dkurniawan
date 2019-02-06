'use strict';

const Joi = require('joi');
const authController = require('../Controllers/auth-controller');

module.exports.signin = {
    handler: authController.signin,
    tags: ['api'],
};

module.exports.signout = {
    handler: authController.signout,
    tags: ['api']
};