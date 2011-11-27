/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/22/11
 * Time: 6:21 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Friend = require('./friend'),
    rstring = require('../utils/random-string-generator'),
    crypto = require('crypto');

var User = module.exports = new Schema({
    email: { type: String, unique: true, index: true }
    , firstName: String
    , lastName: String
    , password: { type: String, set: setPassword }
    , salt: String
    , status: { type: String, enum: [ 'Active', 'Inactive', 'Suspended' ], default: 'Active' }
    , bio: String
    , lastLoginDate: Date
    , createDate: { type: Date, default: Date.now }
});

function setPassword(password) {
    var salt = rstring(8, true, true);
    this.salt = salt;
    return __getHash(salt + password);
};

User.statics.createUser = function(input, callback) {
    var user = new this();
    user.firstName = input.firstName;
    user.lastName = input.lastName;
    user.password = input.password;
    user.email = input.email;

    user.save(callback);
};

User.statics.findByEmailAndPassword = function(email, password, callback) {
    var self = this;
    this.findOne({ email: email }, function(err, data) {
        if (data) {
            var hash = __getHash(data.salt + password);
            self.findOne({ email: email, password: hash }, callback);
        }
    });
};

User.statics.findFriends = function(userId, callback) {
    var getFriendIds = function(err, data) {
        this.find({ _id: { $in: data }}, callback);
    };

    Friend.find({ source: userId }, { target: 1 }, getFriendIds);
};

function __getHash(password) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(password);
    return sha1.digest('base64');
};