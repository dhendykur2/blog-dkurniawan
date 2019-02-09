'use strict';

const userService = require('../Services/user');

module.exports.getUserById = (request) => {
    return userService.getUserById(request.params.id);
};

module.exports.updatePassword = (request) => {
    return userService.updatePassword(request.payload, request.params.id)
    .then((user) => {
        if(!user) {
            return {
                update: false,
                message: "fail to update password"
            }
        }
        return {
            update: true,
            message: "password has been updated"
        }
    });
}