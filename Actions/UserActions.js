'use strict'

var Reflux = require("reflux");
var UserActions = Reflux.createActions(["getUsers"]);

UserActions.getUsers.shouldEmit = (value) => {
	return true;
}

module.exports = UserActions;