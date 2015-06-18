'use strict'

var Reflux = require("reflux");
var UserActions = Reflux.createActions({
	"fillAuthenticatedUser": {asyncResult: true},
});

UserActions.fillAuthenticatedUser.shouldEmit = (value) => {
	return true;
}

module.exports = UserActions;