'use strict'

var Reflux = require("reflux");

// STORES && ACTIONS
var UserActions = require("../Actions/UserActions");
var HostActions = require("../Actions/HostActions");
var HostStore = require("./HostStore");

// UTILITIES
var _ = require("lodash");

var UserStore = Reflux.createStore({
	listenables: [HostActions],
	recentQuery: "",

	onRetrieveUsers: function(query) {
		/*******************************************************************
		************************* Use one-time data pull *******************
		*******************************************************************/
		
		

		// return found authors
	},
})


module.exports = UserStore;