'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
    host: '127.0.0.1',
    port: 5000
});

// Add the route
server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {
        return'hello worldASD';
    }
});

// Start the server
const start =  async function() {
    try {
        await server.register(require('./api'));
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();