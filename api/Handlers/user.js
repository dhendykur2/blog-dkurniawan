'use strict';

const Joi = require('joi');
const userController = require('../Controllers/user-controller');

module.exports.getUserById = {
    tags: ['api'],
    handler: userController.getUserById
};

module.exports.updatePassword = {
    tags: ['api'],
    handler: userController.updatePassword,
    validate: {
        payload: {
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required()
        }
    }
}