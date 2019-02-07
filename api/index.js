'use strict';

const Tag = require('./Handlers/tag');
const Auth = require('./Handlers/auth');
const Post = require('./Handlers/post');

module.exports = {
    register: (server) => {
        server.route([
            // User Route


            // Post Route
            {method: 'POST', path: '/post', options: Post.create},
            {method: 'GET', path: '/post', options: Post.getAll},
            {method: 'GET', path: '/post/{tag}', options: Post.getPostByTag},
            {method: 'PUT', path: '/post/{id}', options: Post.updatePost},
            {method: 'DELETE', path: '/post/{id}', options: Post.deletePost},

            // Tag Route
            {method: 'POST', path: '/tag', options: Tag.createTag},
            {method: 'GET', path: '/tag/{id}', options: Tag.getOne},
            {method: 'GET', path: '/tag', options: Tag.getAll},

            // Auth Route
            {method: 'POST', path: '/signin', options: Auth.signin},
            {method: 'GET', path: '/signout', options: Auth.signout},
            {method: 'POST', path: '/signup', options: Auth.signup},
        ]);
    },
    name: 'api-plugin'
};