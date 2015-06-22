'use strict'

// React Native Parts
var React = require('react-native');
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");

// COMPONENTS

// ACTIONS && STORES
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");
var ItemActions = require("../Actions/ItemActions");
var ItemStore = require("../Stores/ItemStore");
var UserActions = require("../Actions/UserActions");
var UserStore = require("../Stores/UserStore");

// Utilities
var _ = require("lodash");

var {
	Image,
 	ListView,
 	Navigator,
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
} = React;

var UserMenuScene = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.connect(UserStore)],
	getInitialState: function() {
		return {

		}
	},

	render: function() {
		return (
			<View style={{borderWidth: 1, borderColor: "red"}}>
				<Text>Profile testing...</Text>
			</View>
		);
	},
});

module.exports = UserMenuScene;