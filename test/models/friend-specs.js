/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/26/11
 * Time: 4:06 PM
 * To change this template use File | Settings | File Templates.
 */
var Feature = require('vows-bdd').Feature
,   assert = require('assert')
,   mongoose = require('mongoose');

var models = require('../../config/models');

models();

const dblink = 'mongodb://localhost/antisocial-test';
const db = mongoose.createConnection(dblink);

var User = db.model('User');
var Friend = db.model('Friend');
var FriendRequest = db.model('FriendRequest');

var user1, user2, request, friend;

Feature('Friend')
    .scenario('When adding a new friend')

    .given('a new user', function() {
        User.createUser({
            firstName: 'Joe',
            lastName: 'Smith',
            email: 'joe1@test.com',
            password: 'pw'
        }, this.callback);

    })

    .and('another new user', function(user) {
        user1 = user;

        User.createUser({
            firstName: 'Joe',
            lastName: 'Smith',
            email: 'joe2@test.com',
            password: 'pw'
        }, this.callback);
    })

    .and('a friend request', function(user) {
        user2 = user;
        FriendRequest.addRequest(user1._id, user2._id, this.callback);
    })

    .when('accepting a friend request', function(req) {
        request = req;
        Friend.createFriend(req, this.callback);
    })

    .then('it should add the friend', function(f) {
        friend = f;
        assert.isObject(f.source);
        assert.isObject(f.target);
        assert.equal(f.relationship, 'Friend');
    })

    .complete(function() {
        friend.remove(this.callback);
        user1.remove(this.callback);
        user2.remove(this.callback);
        request.remove(this.callback);
    })

    .finish(module)