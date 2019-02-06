const SECRET_KEY = process.env.JWT_SECRET;

exports.register = function (plugin, options, next) {
  plugin.auth.strategy('jwt', 'jwt', {
    key: SECRET_KEY,
    verifyOptions: {
      algorithms: ['HS256']
    },
    validateFunc: (decoded, request, callback) => {
      return callback(null, true, decoded);
    }
  });

  // Uncomment this to apply default auth to all routes
  plugin.auth.default('jwt');

  next();
};

exports.register.attributes = {
  name: 'auth'
};
