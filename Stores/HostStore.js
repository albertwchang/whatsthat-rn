'use strict'

var Reflux = require("reflux");
var Firebase = require("firebase");
var HostActions = require("../Actions/HostActions");

var _ = require("lodash");

var HostStore = Reflux.createStore({
	listenables: [HostActions],
	hosts: {
		db: new Firebase("https://whatsthat.firebaseIO.com"),
		policyGenerator: {
			name: "martiangold",
			url: "http://towimg.martiangold.com/s3-whatsthat-upload.php?bucket=whatsthat",
			bucket: "whatsthat",
		},
		image: {
			name: "s3",
			url: "https://s3-us-west-1.amazonaws.com/"
		}
	},

	init: function() {
		this.trigger({db: this.hosts.db});
	},

	getInitialState: function() {
		return {
			db: this.hosts.db
		}
	},

	onGetDb: function() {
		HostActions.getDb.completed(this.hosts.db);
	},

	onGetS3Policy: function() {
		console.log("Getting S3 policy");

		var fetchParams = {
		  method: 'GET',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
		  },
		  withCredentials: true,
		};

  	fetch(this.hosts.policyGenerator.url, fetchParams)
			.then((response) => {
				var policy = JSON.parse(response._bodyText);
				debugger;
				HostActions.getS3Policy.completed(policy);
			})
			.catch((err) => {
				debugger;
				HostActions.getS3Policy.failed(err);
			});
	}
})

module.exports = HostStore;