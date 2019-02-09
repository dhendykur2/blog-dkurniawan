'use strict';

const postService = require('../Services/post');
const tagService = require('../Services/tag');
const Boom = require('boom')
const jwt = require('jsonwebtoken');

module.exports.create = (request) => {
    const p = request.payload;
    // const isAuthenticated = request.state.session;
    // console.log(isAuthenticated.user);
    // //jwt.decode()
    // if (!isAuthenticated) {
    //     return "Sign in First";
    // }
    //const userId = isAuthenticated.user.id;
    const userId = p.postedBy || null;
    console.log(!userId);
    if(!userId){
        return "Sign in First";
    }
    return postService.create(p)
    ;
};

module.exports.getAll = (request) => {
    return postService.getAll();
};

module.exports.getPostByTag = (request) => {
    return postService.getPostByTag(request.params.tag);
};

module.exports.getPostById = (request) => {
    return postService.getPostById(request.params.id);
}

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