'use strict'

var Reflux = require("reflux");
var ItemActions = Reflux.createActions(["one", "two", "three"]);

ItemActions.one.shouldEmit = (value) => {
	return value > 1;
}

ItemActions.two.shouldEmit = (value) => {
	return value > 2;
}

ItemActions.three.shouldEmit = (value) =>  {
	return value > 3;
}

module.exports = ItemActions;