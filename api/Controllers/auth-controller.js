'use strict';

const authService = require('../Services/auth');
const bcrypt = require('bcrypt');
const Boom = require('boom');

module.exports.signin = (request, reply) => {
    const p = request.payload;
    const isAutthenticated = request.state.session;
    if (isAutthenticated) {
        return "falsed";
    }
    return authService.signin(p)
    .then((user) => {
        if(user == "false"){
            return "false";
        }
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

module.exports.signup = (request) => {
    const p = request.payload;
    const password = bcrypt.hashSync(p.password, 10);
    return authService.signup(p, password);
}