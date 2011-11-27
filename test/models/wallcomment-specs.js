/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/26/11
 * Time: 6:57 PM
 * To change this template use File | Settings | File Templates.
 */

var Feature = require('vows-bdd').Feature
,   assert = require('assert')
,   mongoose = require('mongoose')
,   ObjectId = mongoose.Schema.ObjectId;

var models = require('../../config/models');

models();

const dblink = 'mongodb://localhost/antisocial-test';
const db = mongoose.createConnection(dblink);

var Wall = db.model('WallComment');
var User = db.model('User');

Feature('Wall')
    .scenario('Adding a comment')

    .when('Creating a comment', function() {
        Wall.addComment('47cc67093475061e3d95369d', '47cc67093475061e3d95369d', 'Test Comment', this.callback);
    })

    .then('It should save the comment', function(comment) {
        assert.equal(comment.comment, 'Test Comment');
    })

    .complete(function(comment) {
        comment.remove(this.callback);
    })

    .scenario('Getting a user\'s wall')

    .given('a user', function() {
        User.createUser({
            firstName: 'Joe',
            lastName: 'Smith'
        }, this.callback);
    })

    .and('a post on the wall', function(user) {
        this.user = user;
        Wall.addComment(user._id, user._id, 'Test Comment', this.callback);
    })

    .when('getting the wall', function(comment) {
        this.comment = comment;
        Wall.getComments(this.user._id, this.callback);
    })

    .then('it should return the posts', function(err, posts) {
        assert.isNull(err);
        assert.equal(posts[0].comment, 'Test Comment');
    })

    .complete(function() {
        this.user.remove(this.callback);
        this.comment.remove(this.callback);
    })

    .finish(module);