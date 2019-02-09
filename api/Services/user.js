'use strict';

const Model = require('../../models');
const bcrypt = require('bcryptjs');

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

module.exports.updatePassword = (newData, identifier) => {
    return Model.User.findOne({
        where: {
            id: identifier
        }
    })
    .then((user) => {
        const isValid = bcrypt.compareSync(newData.oldPassword, user.password);
        console.log(isValid);
        const hashedPass = bcrypt.hashSync(newData.newPassword, 10);

        console.log(hashedPass);
        if(!isValid) return false
        return user.update({
            password: hashedPass
        })
        .then((users) => {
            return users;
        })
    })
    .catch(error => {
        console.log(error);
        return error;
    })
}