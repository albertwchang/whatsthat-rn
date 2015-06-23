'use strict'

var Reflux = require("reflux");

// STORES && ACTIONS
var UserActions = require("../Actions/UserActions");
var HostActions = require("../Actions/HostActions");
var HostStore = require("./HostStore");

// UTILITIES
var _ = require("lodash");

var UserStore = Reflux.createStore({
	authenticatedUser: null,
	db: null,
	listenables: [UserActions],
	recentQueries: null, // will be a string
	users: null,

	getInitialState: function() {
		return {
			authenticatedUser: this.authenticatedUser,
			users: this.users
		}
	},

	init: function() {
		this.users = new Array(2);
		this.users["all"] = null;
		this.users["authenticatedUser"] = null;
		this.users["user"] = null;

		this.recentQueries = new Array(2);
		this.recentQueries["all"] = null;
		this.recentQueries["user"] = null;

		this.listenTo(HostStore, this._updateDb, this._updateDb);
	},

	onGetUsers: function(query, type) {
		/*******************************************************************
		************************* Use one-time data pull *******************
		*******************************************************************/
		if (query == this.recentQueries[type])
			return UserActions.getUsers.completed(this.users[type]);
		else {
			var dbRef = this.db.child(query);
			
			dbRef.once("value", (data) => {
				UserActions.getUsers.completed(this.users[type] = data.val());
			}, (err) => {
				reject(err);
			});

			// Listen to changes for any USER
			dbRef.on("child_changed", (data, key) => {
				if ( _.has(this.users[type], key) ) {
					this.users[type][key] = data.val();
					this.trigger({users: this.users});
				}
			});
		};
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

					this.trigger({authenticatedUser: this.authenticatedUser});
					UserActions.fillAuthenticatedUser.completed(this.authenticatedUser);
				});
			}, (err) => {
				console.log(err);
			});
			
			return dbRef;
		});
	},

	onLogoutUser: function() {
		this.db.unauth();
		this.authenticatedUser = null;
		UserActions.logoutUser.completed();
	},

	_extractUid: function(uid) {
		return parseInt( uid.substr(uid.lastIndexOf(':') + 1) );
	},
})


module.exports = UserStore;