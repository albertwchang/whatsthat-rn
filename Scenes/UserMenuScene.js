'use strict'

// React Native Parts
var React = require('react-native');
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");

// SCENES
var Votes = require("../Comps/Votes");

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
 	ScrollView,
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	main: {
		flex: 1,
		borderWidth: 1,
		borderColor: "red",
		height: 200,
		justifyContent: "center",
		alignItems: "center",
	}
})

var UserMenuScene = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.connect(UserStore)],
	getInitialState: function() {
		return {

		}
	},

	_logout: function() {
		UserActions.logoutUser.triggerPromise().then(() => {
			this.props.setContext(true);	
		});
	},

	render: function() {
		return (
			<ScrollView
        scrollEventThrottle={200}>
			   		<TouchableHighlight
							underlayColor="#FF0000"
							onPress={this._logout}>
				   		<Text>Log Out</Text>
				   	</TouchableHighlight>
			</ScrollView>
		);
	},
});

module.exports = UserMenuScene;