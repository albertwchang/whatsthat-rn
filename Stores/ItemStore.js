'use strict'

var Reflux = require("reflux");
var ItemActions = require("../Actions/ItemActions");

var ItemStore = Reflux.createStore({
	listenables: [ItemActions],
	onOne() {
		console.log("One triggered");
	},

	onTwo() {
		console.log("Two triggered");
	},

	onThree() {
		console.log("Three triggered");
	},
	data: [
		{
			"authorId" : "1",
			"created" : "2015-03-02T13:41:32-08:00",
			"desc" : "Mocha Tesora is mucho deliciouso",
			"filename" : "0.jpg",
			"geoPoint" : {
			  "lat" : 36.9752906,
			  "latitude" : 36.9752906,
			  "long" : -122.026039,
			  "longitude" : -122.026039
			},
			"iid" : "0",
			"name" : "Fabulous Philz",
			"votes" : {
			  "down" : 0,
			  "up" : 0
			}
		}, {
			"authorId" : "2",
			"created" : "2015-03-01T17:25:27-08:00",
			"desc" : "Freagin' amazing-ass skyline near Natural Bridges",
			"filename" : "1.jpg",
			"geoPoint" : {
			  "lat" : 36.9494915,
			  "latitude" : 36.9494915,
			  "long" : -122.0490094,
			  "longitude" : -122.0490094
			},
			"iid" : "1",
			"name" : "Sunny Santa Cruz",
			"votes" : {
			  "down" : 0,
			  "up" : 1
			}
		}, {
			"authorId" : "1",
			"created" : "2015-03-02T13:41:32-08:00",
			"desc" : "Mocha Tesora is mucho deliciouso",
			"filename" : "0.jpg",
			"geoPoint" : {
			  "lat" : 36.9752906,
			  "latitude" : 36.9752906,
			  "long" : -122.026039,
			  "longitude" : -122.026039
			},
			"iid" : "0",
			"name" : "Fabulous Philz",
			"votes" : {
			  "down" : 0,
			  "up" : 0
			}
		}, {
			"authorId" : "1",
			"created" : "2015-03-02T13:41:32-08:00",
			"desc" : "Mocha Tesora is mucho deliciouso",
			"filename" : "0.jpg",
			"geoPoint" : {
			  "lat" : 36.9752906,
			  "latitude" : 36.9752906,
			  "long" : -122.026039,
			  "longitude" : -122.026039
			},
			"iid" : "0",
			"name" : "Fabulous Philz",
			"votes" : {
			  "down" : 0,
			  "up" : 0
			}
		}
	],
})

module.exports = ItemStore;