/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/22/11
 * Time: 6:48 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Friend = module.exports = new Schema({
    relationship: { type: String, enum: [ 'Friend', 'Spouse', 'Dating' ] }
    , source: { type: ObjectId, index: true, ref: 'User' }
    , target: { type: ObjectId, index: true, ref: 'User' }
    , createDate: { type: Date, default: Date.now }
});

Friend.statics.createFriend = function(request, callback) {
    var friend = new this();
    friend.relationship = 'Friend';
    friend.source = request.sourceUser;
    friend.target = request.targetUser;

    friend.save(callback);
};