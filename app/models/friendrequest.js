/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/22/11
 * Time: 6:50 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FriendRequest = module.exports = new Schema({
    sourceUser: { type: ObjectId, index: true, ref: 'User' }
    , targetUser: { type: ObjectId, index: true, ref: 'User' }
    , status: { type: String, enum: [ "Active", "Accepted", "Rejected" ] }
    , createDate: { type: Date, default: Date.now }
});

FriendRequest.statics.Status = {
    Active: 'Active',
    Accepted: 'Accepted',
    Rejected: 'Rejected'
};

FriendRequest.statics.addRequest = function(source, target, callback) {
    var req = new this();
    req.sourceUser = source;
    req.targetUser = target;
    req.status = 'Active';

    req.save(callback);
}

FriendRequest.statics.findBySourceAndTarget = function(source, target, callback) {
    this.findOne({ sourceUser: source, targetUser: target }, callback);
};