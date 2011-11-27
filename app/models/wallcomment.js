/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/26/11
 * Time: 4:07 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var WallComment = module.exports = new Schema({
    user: { type: ObjectId, index: true },
    author: { type: ObjectId, index: true },
    comment: String,
    createDate: { type: Date, default: Date.now, index: true }
});

WallComment.statics.addComment = function(user, author, comment, callback) {
    var post = new this();
    post.user = user;
    post.author = author;
    post.comment = comment;
    post.save(callback);
};

WallComment.statics.getComments = function(user, callback) {
    this.find({ user: user }, {}, callback);
};