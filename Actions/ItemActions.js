'use strict'

var Reflux = require("reflux");

var ItemActions = Reflux.createActions(
	{
		"getItems": {
			children: ["done", "failed"]
		}
	}
);

ItemActions.getItems.shouldEmit = (value) =>  {
	return true;
}

module.exports = ItemActions;