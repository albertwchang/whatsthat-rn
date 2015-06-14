'use strict'

var Reflux = require("reflux");

// STORES && ACTIONS
var ItemActions = require("../Actions/ItemActions");
var UserActions = require("../Actions/UserActions");
var HostActions = require("../Actions/HostActions");
var HostStore = require("./HostStore");

// UTILITIES

var ItemStore = Reflux.createStore({
	listenables: [ItemActions],
	db: null, // will be a firebase instance
	recentQueries: null, // will be a string
	items: null,

	getInitialState: function() {
		return {
			items: this.items,
		}
	},

	init: function() {
		this.items = new Array(2);
		this.items["all"] = null;
		this.items["user"] = null;

		this.recentQueries = new Array(2);
		this.recentQueries["all"] = null;
		this.recentQueries["user"] = null;

		this.listenTo(HostStore, this._updateDb, this._updateDb);
	},

	onGetItems: function(query, type) {
		// check "recentQuery" variable.  Exists => don't pull data
		if (query == this.recentQueries[type])
			return ItemStore.getItems.done(this.items[type]);
		else {
			/*******************************************************************
			************************* Use one-time data pull *******************
			*******************************************************************/
			
			// obtain ITEMS
			var ref = this.db.child(query);
			ref.once("value", (data) => {
				ItemActions.getItems.done( this.items[type] = data.val() );
			}, (err) => {
				ItemActions.getItems.failed(err);
			});
		}
	},

	_retrieveItems: function(dbRef) {

	},

	_updateDb: function(data) {
		this.db = data.db;
	}

	// 	//return items back to caller
	// }
})

module.exports = ItemStore;