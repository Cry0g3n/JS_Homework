var Controller = require('./controller');

var Router = {
    handle: function (route) {
        var routeName = route + 'Route';

        Controller[routeName]();
    }
};

module.exports = Router;