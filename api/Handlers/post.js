'use strict';

const Joi = require('joi');
const postController = require('../Controllers/post-controller');

module.exports.create = {
    handler: postController.create,
    tags: ['api'],
    validate: {
        payload: {
            title: Joi.string().required(),
            description: Joi.string().required(),
            tag: Joi.string().required()
        }
    }
}