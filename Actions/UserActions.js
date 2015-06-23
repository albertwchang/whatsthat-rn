'use strict'

var Reflux = require("reflux");
var UserActions = Reflux.createActions({
	"fillAuthenticatedUser": {asyncResult: true},
	"logoutUser": {asyncResult: true},
	"getUsers": {asyncResult: true},
});

UserActions.fillAuthenticatedUser.shouldEmit = (value) => {
	return true;
}

UserActions.getUsers.shouldEmit = (value) => {
	return true;
}

UserActions.logoutUser.shouldEmit = (value) => {
	return true;
}

module.exports = UserActions;