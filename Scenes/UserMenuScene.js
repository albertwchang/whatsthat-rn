'use strict'

// React Native Parts
var React = require('react-native');
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");

// COMPONENTS
var AuthContext = require("../Contexts/Auth2Context");

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
	word: {
		color: "red",
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
			// add navigator.replace...
			var route = {
				component: AuthContext,
			};

			this.props.navigator.parentNavigator.replace(route);
		});
	},

	render: function() {
		return (
			<ScrollView
        scrollEventThrottle={200}>
		   		<TouchableHighlight
						underlayColor="#FF0000"
						onPress={this._logout}>
			   		<Text style={styles.word}>Log Out</Text>
			   	</TouchableHighlight>
			</ScrollView>
		);
	},
});

module.exports = UserMenuScene;