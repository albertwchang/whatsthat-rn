'use strict'

var Reflux = require("reflux");

var ItemActions = require("../Actions/ItemActions");

var HostStore = require("../Stores/HostStore");
var UserStore = require("../Stores/UserStore");

var ItemStore = Reflux.createStore({
	listenables: [ItemActions],
	onOne: function() {
		console.log("One triggered");
	},

	onTwo: function() {
		console.log("Two triggered");
	},

	onThree: function() {
		console.log("Three triggered");
	},

	retrieveItems: function(query) {

	}


})

module.exports = ItemStore;