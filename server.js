'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    host: '127.0.0.1',
    port: 5000,
    routes: {
        cors: true,
    }
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

const JWT_KEY = 'azEQHAC+yiEggoRKmF/dC3ek3Xi6dWr7OUDiKpRGNFe9X/ZXpn+r79CjitnmMyBvgN+hROgzP6Pe/oRrxxxAZ0nV4EVB/9ISUC6s8b51VObUG9uJVbxugZNQ8OcidvrFfAJK6M4TUVenFflI67yuq8IvQ3jqQa7KhfMqfqyShjpvh5b3ZYKJ4U2XdyExJLQ2VzmieN47dVyURX8koJNvZ4WmWO3PT1bgtJrCLzBU/Hfop+3MhdZTk5oa7CSSBtmn6BNLRPD/bbXrFHS9C5rlHwohpIhNYN4pz54G4rjOA6p6LDibZ7Rdo6LbfTuBlcRUHiEY5ueG1qxGoIb9Fkbd3Q==';

const start =  async function() {
    try {
        
        // await server.register(require('hapi-auth-cookie'));
        // server.auth.strategy('session', 'cookie',{
        //     password : '$2a$10$JwbwopKOwGepKZ/bRbFjB.1Av0HMxxbmGYDeofT55db1WdPEmIf82',
        //     cookie : 'session',
        //     isSecure : false,
        //     validateFunc: async (request, session) => {

        //         const cached = await cache.get(session.sid);
        //         const out = {
        //             valid: !!cached
        //         };
    
        //         if (out.valid) {
        //             out.credentials = cached.account;
        //         }
    
        //         return out;
        //     }
        // });
        await server.register(require('hapi-auth-jwt2'));
        server.auth.strategy('jwt', 'jwt', {
            key: JWT_KEY,
            validate: async (request, session) => {

                        const cached = await cache.get(session.sid);
                        const out = {
                            valid: !!cached
                        };
            
                        if (out.valid) {
                            out.credentials = cached.account;
                        }
            
                        return out;},
            verifyOptions: { algorithm: ['HS256'] }
        })
        //server.auth.default('jwt');
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