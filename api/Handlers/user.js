'use strict';

const Joi = require('joi');
const userController = require('../Controllers/user-controller');

module.exports.getUserById = {
    tags: ['api'],
    handler: userController.getUserById
}