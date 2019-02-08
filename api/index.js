'use strict';

const Tag = require('./Handlers/tag');
const Auth = require('./Handlers/auth');
const Post = require('./Handlers/post');
const User = require('./Handlers/user');

module.exports = {
    register: (server) => {
        server.route([
            // User Route
            {method: 'GET', path: '/user/{id}', options: User.getUserById},

            // Post Route
            {method: 'POST', path: '/post', options: Post.create},
            {method: 'GET', path: '/post', options: Post.getAll},
            {method: 'GET', path: '/post/tag/{tag}', options: Post.getPostByTag},
            {method: 'PUT', path: '/post/{id}', options: Post.updatePost},
            {method: 'DELETE', path: '/post/{id}', options: Post.deletePost},
            {method: 'GET', path: '/post/{id}', options: Post.getPostById},

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