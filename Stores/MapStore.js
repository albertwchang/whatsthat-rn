'use strict'

var Reflux = require("reflux");

// STORES && ACTIONS
var MapActions = require("../Actions/MapActions");

// UTILITIES
var _ = require("lodash");

module.exports = Reflux.createStore({
	listenables: [MapActions],
	mapConstants: {
		earthRadius: {
			value: 6371,
			measuringUnit: "km"
		},
	},

	getInitialState: function() {
		return {
			mapConstants: this.mapConstants,
		}
	},

	onActivateMap: function() {
		if (this.map == null) {
			// // this.map NOT instantiated
			// GoogleMaps.load((googleMap) => {
			// 	debugger;
			// 	this.map = googleMap;
			// 	this.trigger({map: this.map});
			// }, (err) => {
			// 	console.log(err);
			// });
		} else {
			// this.map IS instantiated
		}
	},
});