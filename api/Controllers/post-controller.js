'use strict';

const postService = require('../Services/post');
const Boom = require('boom')

module.exports.create = (request) => {
    const p = request.payload;
    const isAuthenticated = request.state.session;
    //console.log(isAuthenticated);
    if (isAuthenticated === null) {
        return "Sign in first";
    }
    const userId = isAuthenticated.user.id;
    //console.log(p.tag);
    return postService.create(p, userId);
}