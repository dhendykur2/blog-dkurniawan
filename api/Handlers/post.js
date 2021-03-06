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
            tag: Joi.string().required(),
            postedBy: Joi.number()
        }
    }
};

module.exports.getAll = {
    handler: postController.getAll,
    tags: ['api']
};

module.exports.getPostByTag = {
    handler: postController.getPostByTag,
    tags: ['api']
};

module.exports.getPostById = {
    handler: postController.getPostById,
    tags: ['api']
};

module.exports.updatePost = {
    handler: postController.updatePost,
    tags: ['api']
};

module.exports.deletePost = {
    handler: postController.deletePost,
    tags: ['api']
};

module.exports.getPostByPostedBy = {
    handler: postController.getPostByPostedBy,
    tags: ['api']
}