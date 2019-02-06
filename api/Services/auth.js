'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('../../models');
const Hapi = require('hapi');

module.exports.signin = async (email, password, request, h) => {
    // const isAutthenticated = request.state.session;
    // if (isAutthenticated) {
    //     return "false";
    // }
    return Model.User.findOne({
        where: {
            email: email.toLowerCase()
        }
    })
    .then( user => {
        if (!user) return "false";
        const isValid = bcrypt.compareSync(password, user.password);
        if (isValid) {
            return user;
        }
        return "false"
    })
    .catch(error => {
        return error;
    });

};

