'use strict';

const Joi = require('joi');
const authController = require('../Controllers/auth-controller');

module.exports.signin = {
    handler: authController.signin,
    tags: ['api'],
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }
};

module.exports.signout = {
    handler: authController.signout,
    tags: ['api']
};

module.exports.signup = {
    handler: authController.signup,
    tags: ['api'],
    validate: {
        payload: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }
};