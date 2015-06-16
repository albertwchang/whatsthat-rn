'use strict'

var Reflux = require("reflux");
var HostActions = Reflux.createActions(
	{
		"getS3Policy": {asyncResult: true},
		"setImgHostURL": {
			children: ["done", "failed"]
		},
		"getDb": {
			children: ["done", "failed"]
		},
	}
);

HostActions.getS3Policy.shouldEmit = (value) => {
	return true;
}

HostActions.setImgHostURL.shouldEmit = (value) => {
	return true;
}

HostActions.getDb.shouldEmit = (value) => {
	return true;
}

module.exports = HostActions;