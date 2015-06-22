'use strict'

var Reflux = require("reflux");

// STORES && ACTIONS
var ItemActions = require("../Actions/ItemActions");
var HostActions = require("../Actions/HostActions");
var HostStore = require("./HostStore");

// UTILITIES
var _ = require("lodash");

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
			return ItemActions.getItems.completed(this.items[type]);
		else {
			/*******************************************************************
			************************* Use one-time data pull *******************
			*******************************************************************/
			var dbRef = this.db.child(query);
			dbRef.once("value", (data) => {
				ItemActions.getItems.completed( this.items[type] = data.val() );
			}, (err) => {
				ItemActions.getItems.failed(err);
			});

			// LISTEN TO CHANGES TO ANY ITEM
			dbRef.on("child_changed", (data) => {
				var key = data.key();

				if ( _.has(this.items[type], key) ) {
					this.items[type][key] = data.val();
					this.trigger({items: this.items});
				}
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