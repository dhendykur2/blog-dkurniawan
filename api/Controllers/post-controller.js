'use strict';

const postService = require('../Services/post');
const tagService = require('../Services/tag');
const Boom = require('boom')

module.exports.create = (request) => {
    const p = request.payload;
    const isAuthenticated = request.state.session;
    //console.log(isAuthenticated);
    if (isAuthenticated === undefined) {
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
};

module.exports.updatePost = (request) => {
    return postService.updatePost(request.payload, request.params.id);
};

module.exports.deletePost = (request) => {
    const isAuthenticated = request.state.session;
    if(!isAuthenticated) {
        return "Sign in first";
    }
    return postService.deletePost(request.params.id, request.state.session.user.id);
}