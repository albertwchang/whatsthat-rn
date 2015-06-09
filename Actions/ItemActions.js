'use strict'

var Reflux = require("reflux");
var ItemActions = Reflux.createAction(["one", "two", "three"]);

module.exports = ItemActions;