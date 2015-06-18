'use strict'

var Reflux = require("reflux");

// STORES && ACTIONS
var UserActions = require("../Actions/UserActions");
var HostActions = require("../Actions/HostActions");
var HostStore = require("./HostStore");

// UTILITIES
var _ = require("lodash");

var UserStore = Reflux.createStore({
	listenables: [UserActions],
	db: null,
	recentQuery: "",
	authenticatedUser: null,
	unWatchers: [],

	getInitialState: function() {
		return {
			authenticatedUser: this.authenticatedUser
		}
	},

	onRetrieveUsers: function(query) {
		/*******************************************************************
		************************* Use one-time data pull *******************
		*******************************************************************/
		
		

		// return found authors
	},

	onFillAuthenticatedUser: function(userId) {
		var qDb = new Promise((resolve, reject) => {
			// 1. get DB reference (Firebase) from HostStore
			if (!this.db) {
				HostActions.getDb.triggerPromise().then((db) => {
					resolve(this.db = db);
				}).catch((err) => {
					reject(err);
				});
			} else
				resolve(this.db);
		});
		
		// 2. Perform one-time API request of user
		qDb.then((db) => {
			var uid = this._extractUid(userId);
			var dbRef = db.child("users").orderByChild("uid").equalTo(uid);

			dbRef.once("value", (result) => {
				// assumes only 1 result;
				_.each(result.val(), (value, key) => {
					this.authenticatedUser = {
						key: key,
						value: value,
					}

					UserActions.fillAuthenticatedUser.completed(this.authenticatedUser);
				});
			}, (err) => {
				console.log(err);
			});
			
			return dbRef;
		});
	},

	_extractUid: function(uid) {
		return parseInt( uid.substr(uid.lastIndexOf(':') + 1) );
	},
})


module.exports = UserStore;