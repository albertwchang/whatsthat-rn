'use strict'

var Reflux = require("reflux");
var HostActions = require("../Actions/HostActions");
var _ = require("lodash");

var HostStore = Reflux.createStore({
	listenables: [HostActions],
	hosts: {
		db: {
			name: "firebase",
			url: "https://whatsthat.firebaseIO.com"
		},
		policyGenerator: {
			name: "martiangold",
			url: "http://towimg.martiangold.com/s3-upload.php?bucket=whatsthat"
		},
		image: {
			name: "s3",
			url: "https://s3-us-west-1.amazonaws.com/"
		}
	},

	getInitialState(){
		return {
			imgHostURL: this.imgHostURL
		};
	},

	init() {
		this.imgHostURL = this.hosts.image.url;
	},

	onSetImgHostURL(args) {
		// args is an array
		var urlParams = "";
		_.each(args, (arg) => {
			urlParams = urlParams +"/" +arg;
		});

		this.imgHostURL = this.imgHostURL +urlParams +"/";
		this.trigger(this.imgHostURL);
	},

	onGetS3Policy() {
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
				HostActions.getS3Policy.done(policy);
			})
			.catch((err) => {
				HostActions.getS3Policy.failed(err);
			});
	}
})

module.exports = HostStore;