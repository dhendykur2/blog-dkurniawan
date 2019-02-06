'use strict';
//get all handlers here to const
const Tag = require('./Handlers/tag');
const Auth = require('./Handlers/auth');

module.exports = {
    
    register: (server) => {
        server.route([
            //register all route server here
            //{method: 'GET', path: '/', options: ...},
            // User Route


            // Post Route

            // Tag Route
            {method: 'POST', path: '/tag', options: Tag.createTag },
            {method: 'GET', path: '/tag/{id}', options: Tag.getOne },
            {method: 'GET', path: '/tag', options: Tag.getAll },

            {method: 'PUT', path: '/tag/{id}', options: Tag.update },

            // Auth Route
            {method: 'POST', path: '/signin', options: Auth.signin },
            {method: 'GET', path: '/signout', options: Auth.signout},
        ]);
        //server.auth.strategy('simple','basic', validate);
        //server.auth.default('simple')
    },
    
    name: 'api-plugin'
};