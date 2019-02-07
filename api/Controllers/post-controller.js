'use strict';

const postService = require('../Services/post');
const tagService = require('../Services/tag');
const Boom = require('boom')

module.exports.create = (request) => {
    const p = request.payload;
    const isAuthenticated = request.state.session;
    if (isAuthenticated === null) {
        return "Sign in first";
    }
    const userId = isAuthenticated.user.id;
    return postService.create(p, userId);
};

module.exports.getAll = (request) => {
    return postService.getAll();
};

module.exports.getPostByTag = (request) => {
    return postService.getPostByTag(request.params.tag);
}