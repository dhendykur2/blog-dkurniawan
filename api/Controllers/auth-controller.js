'use strict';

const authService = require('../Services/auth');

module.exports.signin = (request, reply) => {
    const p = request.payload;
    return authService.signin(p.email, p.password);
}