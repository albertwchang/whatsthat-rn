'use strict'

var Reflux = require("reflux");

var ItemActions = Reflux.createActions(
	{
		"getItems": { asyncResult: true },
	}
);

ItemActions.getItems.shouldEmit = (value) =>  {
	return true;
}

module.exports = ItemActions;