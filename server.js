'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    host: '127.0.0.1',
    port: 5000
});

server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {
        return '<form method="POST" action="/signin">'+
        '<label>email</label><input type="text" name="email"><br/>'+
        '<label>password</label><input type="password" name="password"><br/><button>submit</button></form>';
    }
});

const start =  async function() {
    try {
        
        await server.register(require('hapi-auth-cookie'));
        server.auth.strategy('session', 'cookie',{
            password : '$2a$10$JwbwopKOwGepKZ/bRbFjB.1Av0HMxxbmGYDeofT55db1WdPEmIf82',
            cookie : 'session',
            isSecure : false,
            validateFunc: async (request, session) => {

                const cached = await cache.get(session.sid);
                const out = {
                    valid: !!cached
                };
    
                if (out.valid) {
                    out.credentials = cached.account;
                }
    
                return out;
            }
        });
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