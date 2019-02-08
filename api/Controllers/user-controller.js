'use strict';

const userService = require('../Services/user');

module.exports.getUserById = (request) => {
    return userService.getUserById(request.params.id);
};