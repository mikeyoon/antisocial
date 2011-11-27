/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/21/11
 * Time: 7:24 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function(app) {
    app.get('/index', function(req, res) { res.send('hi'); });
};