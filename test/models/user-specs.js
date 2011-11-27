/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 11/26/11
 * Time: 1:20 PM
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

Feature('User')
    .scenario('when saving a user')

    .when('creating the user', function() {
        var user = User.createUser({
            firstName: 'Joe',
            lastName: 'Smith',
            email: 'joe@test.com',
            password: 'pw'
        }, this.callback);
    })

    .then('It should return the user', function(user) {
        assert.equal(user.firstName, 'Joe');
        assert.equal(user.lastName, 'Smith');
        assert.equal(user.email, 'joe@test.com');
        assert.isObject(user._id);
    })

    .complete(function(user) {
        user.remove(this.callback);
    })

    .scenario('when getting a user by email and password')

    .given('a new user', function() {
        var user = User.createUser({
            firstName: 'Joe',
            lastName: 'Smith',
            email: 'joe@test.com',
            password: 'pw'
        }, this.callback);
    })

    .when('getting the user', function(user) {
        this.user = user;
        User.findByEmailAndPassword(user.email, 'pw', this.callback);
    })

    .then('it should return the user', function(err, user) {
        assert.equal(user.firstName, 'Joe');
        assert.equal(user.lastName, 'Smith');
        assert.equal(user.email, 'joe@test.com');
        assert.isObject(user._id);
    })

    .complete(function() {
        this.user.remove(this.callback);
    })

    .finish(module);