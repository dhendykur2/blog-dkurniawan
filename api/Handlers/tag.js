'use strict';

const Joi = require('joi');
const tagController = require('../Controllers/tag-controller');

module.exports.createTag = {
    handler: tagController.createTag,
    tags: ['api'],
    validate: {
        payload: {
            name: Joi.string().required()
        }
    },
};

module.exports.findOne = {
    tags: ['api'],
    handlers: tagController.findOne
};

module.exports.getOne = {
    tags: ['api'],
    handler: tagController.getOne,
    
};

module.exports.getAll = {
    tags: ['api'],
    handler: tagController.getAll,
};

module.exports.update = {
    tags: ['api'],
    handler: tagController.update
};