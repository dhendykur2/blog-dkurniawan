'use strict';

const authService = require('../Services/auth');
const Boom = require('boom');

module.exports.signin = (request, reply) => {
    const p = request.payload;
    const isAutthenticated = request.state.session;
    if (isAutthenticated) {
        return "false";
    }
    return authService.signin(p.email, p.password)
    .then((user) => {
        request.cookieAuth.set({user});
        return Promise.resolve(true);
    })
    .catch(err => {
        console.log(err);
        return Boom.badRequest('wrong credentials');
    });
    
};

module.exports.signout = (request, h) => {
    request.cookieAuth.clear();
    return "SIGNED OUT!!";
}