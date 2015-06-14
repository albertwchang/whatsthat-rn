'use strict'

var Reflux = require("reflux");
var GoogleMaps = require('google-maps');

// STORES && ACTIONS
var MapActions = require("../Actions/MapActions");

// UTILITIES
var _ = require("lodash");

var MapStore = Reflux.createStore({
	listenables: [MapActions],
	map: null,
	apiKey: "AIzaSyCOJ-dkcU-lwAdfUT4nywV1qrp-RdxwP44",

	init: function() {
		GoogleMaps.KEY = this.apiKey;
		GoogleMaps.SENSOR = true;
		this.onActivateMap();
	},

	getInitialState: function() {
		return {
			map: this.map,
		}
	},

	onActivateMap: function() {
		if (this.map == null) {
			// this.map NOT instantiated
			GoogleMaps.load((googleMap) => {
				this.map = googleMap;
				// this.trigger({map: this.map});
			}, (err) => {
				qMap.reject(err);
			});
		} else {
			// this.map IS instantiated
		}
	},
})


module.exports = MapStore;