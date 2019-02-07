'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Model = require('../../models');
const Hapi = require('hapi');

module.exports.signin = async (user, password) => {
    return Model.User.findOne({
        where: {
            email: user.email.toLowerCase()
        }
    })
    .then(user => {
        if (user === null) {
            return "false";
        }
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return "false";
        }
        return user;
    })
    .catch(error => {
        console.log(error);
        return "false credentials";
    });

};

module.exports.signup = (newUser, password) => {
    return Model.User.findOne({
        where: {
            email: newUser.email.toLowerCase()
        }
    }).then((user) => {
        console.log(user);
        if(user === null) {
            return Model.User.create({
                name: newUser.name,
                email: newUser.email,
                password: password,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
        }
        return "email already exists";
    }).catch(error => {
        console.log(error);
        return "false";
    });
    
};