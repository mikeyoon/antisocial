/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/21/11
 * Time: 6:52 PM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express')
,   routes = require('./routes')
,   models = require('./models')

module.exports = function()
{
    var app = express.createServer();

    routes(app);

    return app;
};