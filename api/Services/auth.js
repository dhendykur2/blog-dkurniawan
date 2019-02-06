'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('../../models');

module.exports.signin = (email, password, reply) => {
    return Model.User.findOne({
        where: {
            email: email.toLowerCase()
        }
    })
    .then( user => {
        //if (!user) ;//throw new Error('wrong email/password');
        //console.log(user.password);
        //const validPassword = bcrypt.compareSync(password, user.password);
        //console.log(bcrypt)
        return bcrypt.hash('asdf123', 12).then((hash) => {
            console.log(hash);
            console.log('result' + hash.localeCompare(user.password));
        });
        return bcrypt.compare(password, user.password).then( (res) => {
            console.log(res);
        });
        // console.log(validPassword);
        // if (validPassword) {
        //     return Model.User.findOne({ email: email, password: user.password });
        //     //throw new Error('wrong email/password');
        //     //return reply('salah');
        // }
        // console.log('wrong email/pass' + password);
        // //console.log('wrong email/pass');
        // return reply('asdf');
    });

};