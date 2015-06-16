'use strict'

var Reflux = require("reflux");

// STORES && ACTIONS
var MapActions = require("../Actions/MapActions");

// UTILITIES
var _ = require("lodash");

var MapStore = Reflux.createStore({
	listenables: [MapActions],
	mapConstants: {
		earthRadius: {
			value: 6371,
			measuringUnit: "km"
		},
	},

	init: function() {

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
			debugger;
		} else {
			// this.map IS instantiated
		}
	},
})


module.exports = MapStore;