'use strict';

const authService = require('../Services/auth');
const bcrypt = require('bcryptjs');
const Boom = require('boom');
const jwt = require('jsonwebtoken');

module.exports.signin = (request) => {
    const p = request.payload;
    const isAutthenticated = request.auth.token;
    console.log(isAutthenticated);
    if (isAutthenticated) {
        console.log(isAutthenticated.user);
        return "Already Signin";
    }
    return authService.signin(p, p.password)
    .then((user) => {
        if(!user){
            return {
                login: false,
                message: 'wrong email/password'
            };
        }
        //request.cookieAuth.set(user);
        // const session  = request.auth.credentials;
        // session.permission = user;
        // jwt.sign(session, 'secret')
        return {
            login: true,
            message: 'login successful',
            token: jwt.sign({ expiresIn: 86400, user}, 'secret')
        };

        jwt.verify
        
        //const userCookie = request.state.session.user;
        //console.log(request.state);
        //return Promise.resolve({user});
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
    return authService.signup(p, password)
    .then((user) => {
        if(!user) {
            return {
                register: false,
                message: 'email already exists'
            }
        }
        return {
            register: true,
            message: 'register successful'
        };
    });
}