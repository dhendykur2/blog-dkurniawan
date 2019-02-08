'use strict';

const Model = require('../../models');

module.exports.getUserById = (identifier) => {
    return Model.User.findOne({
        where: {
            id: identifier
        }
    })
    .then((user) => {
        return user;
    })
    .catch(error => {
        console.log(error);
        return error;
    })
};