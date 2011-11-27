/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/21/11
 * Time: 7:23 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
,   Schema = mongoose.Schema;

module.exports = function() {
    mongoose.model('User', require('../app/models/user'));

    mongoose.model('Friend', require('../app/models/friend'));

    mongoose.model('FriendRequest', require('../app/models/friendrequest'));

    mongoose.model('WallComment', require('../app/models/wallcomment'));
};