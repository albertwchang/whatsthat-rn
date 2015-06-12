'use strict'

var Reflux = require("./reflux");
var UserActions = require("../Actions/UserActions");

class DataStore {
	constructor(users, items) {
		super(users, items);
		this.users = users;
		this.items = items;
	}

	costructor() {
		super();
		this.items =  [
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
		];

		this.users = [
			{
				"$id": "0",
			  "email" : "nobody@whatsthat.com",
			  "filename" : "",
			  "firstName" : "Nobody",
			  "iid" : "0",
			  "lastName" : "Nobody",
			  "middleName" : ""
			}, {
			  "$id": "1",
			  "email" : "jpriebe@whatsthat.com",
			  "filename" : "jpriebe.jpg",
			  "firstName" : "Jeffrey",
			  "iid" : "1",
			  "items" : [ "0", "-JlmonQawecGoq1F-zWL", "-JlmonVqpGNMd-flh9dR" ],
			  "lastName" : "Priebe",
			  "middleName" : "",
			  "votes" : [ {
			    "direction" : "up",
			    "itemId" : "1"
			  } ]
			}, {
				"$id": "2",
			  "email" : "aettinger@whatsthat.com",
			  "filename" : "aettinger.png",
			  "firstName" : "Anthony",
			  "iid" : "2",
			  "items" : [ "1" ],
			  "lastName" : "Ettinger",
			  "middleName" : ""
			}, {
				"$id": "3",
			  "email" : "achang@whatsthat.com",
			  "filename" : "achang.jpg",
			  "firstName" : "Albert",
			  "iid" : "3",
			  "lastName" : "Chang",
			  "middleName" : ""
			}, {
				"$id": "4",
			  "email" : "alessandra@whatsthat.com",
			  "filename" : "no-pic.png",
			  "firstName" : "Alessandra",
			  "iid" : "4",
			  "lastName" : "Aless",
			  "middleName" : ""
			}, {
				"$id": "5",
			  "email" : "avina@whatsthat.com",
			  "filename" : "avina.png",
			  "firstName" : "Avina",
			  "iid" : "5",
			  "lastName" : "Avi",
			  "middleName" : ""
			}, {
				"$id": "6",
			  "email" : "charles@whatsthat.com",
			  "filename" : "charles.jpg",
			  "firstName" : "Charles",
			  "iid" : "6",
			  "lastName" : "Bronson",
			  "middleName" : ""
			}, {
				"$id": "7",
			  "email" : "dgoeury@whatsthat.com",
			  "filename" : "dgoeury.jpg",
			  "firstName" : "Denis",
			  "iid" : "7",
			  "lastName" : "Goeury",
			  "middleName" : ""
			}, {
				"$id": "8",
			  "email" : "fraz@whatsthat.com",
			  "filename" : "fraz.jpg",
			  "firstName" : "Fraz",
			  "iid" : "8",
			  "lastName" : "Fraz",
			  "middleName" : ""
			}, {
				"$id": "9",
			  "email" : "greg@whatsthat.com",
			  "filename" : "greg.jpg",
			  "firstName" : "Greg",
			  "iid" : "9",
			  "lastName" : "Greg",
			  "middleName" : ""
			}, {
				"$id": "10",
			  "email" : "jmarsh@whatsthat.com",
			  "filename" : "jmarsh.jpg",
			  "firstName" : "Jeff",
			  "iid" : "10",
			  "lastName" : "Marsh",
			  "middleName" : ""
			}, {
				"$id": "11",
			  "email" : "jbaker@whatsthat.com",
			  "filename" : "jbaker.jpg",
			  "firstName" : "Jordan",
			  "iid" : "11",
			  "lastName" : "Baker",
			  "middleName" : ""
			}, {
				"$id": "12",
			  "email" : "jrenaud@whatsthat.com",
			  "filename" : "jrenaud.jpg",
			  "firstName" : "Josh",
			  "iid" : "12",
			  "lastName" : "Renaud",
			  "middleName" : ""
			}, {
				"$id": "13",
			  "email" : "kcostner@whatsthat.com",
			  "filename" : "kcostner.jpg",
			  "firstName" : "Kevin",
			  "iid" : "13",
			  "lastName" : "Costner",
			  "middleName" : ""
			}, {
				"$id": "14",
			  "email" : "mark@whatsthat.com",
			  "filename" : "mark.jpg",
			  "firstName" : "Marky",
			  "iid" : "14",
			  "lastName" : "Mark",
			  "middleName" : ""
			}, {
				"$id": "15",
			  "email" : "peter@whatsthat.com",
			  "filename" : "peter.jpg",
			  "firstName" : "Peter",
			  "iid" : "15",
			  "lastName" : "Pan",
			  "middleName" : ""
			}, {
				"$id": "17",
			  "email" : "rghatol@whatsthat.com",
			  "filename" : "rghatol.jpg",
			  "firstName" : "Rohit",
			  "iid" : "17",
			  "lastName" : "Ghatol",
			  "middleName" : ""
			}, {
				"$id": "18",
			  "email" : "skyle@whatsthat.com",
			  "filename" : "skyle.png",
			  "firstName" : "Scott",
			  "iid" : "18",
			  "lastName" : "Kyle",
			  "middleName" : ""
			},	{
				"$id": "19",
			  "email" : "scannon@whatsthat.com",
			  "filename" : "scannon.jpg",
			  "firstName" : "Susan",
			  "iid" : "19",
			  "lastName" : "Cannon",
			  "middleName" : ""
			}, {
				"$id": "20",
			  "email" : "tberchenbriter@whatsthat.com",
			  "filename" : "tberchenbriter.jpg",
			  "firstName" : "Tom",
			  "iid" : "20",
			  "lastName" : "Berchenbriter",
			  "middleName" : ""
			}
		]
	}

	getUsers() {
		return this.users;
	}

	getItems() {
		return this.items;
	}
}



module.exports = DataStore;