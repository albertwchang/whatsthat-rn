'use strict'

var Reflux = require("reflux");
var MapActions = Reflux.createActions(["activateMap"]);

// MapActions.activateMap.shouldEmit = (value) => {
// 	return true;
// }

module.exports = MapActions;