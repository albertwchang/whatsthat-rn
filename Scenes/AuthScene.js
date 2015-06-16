/*
	1. Routing used for Login vs. Registration
	2. Navigator replace used to bring up Main Scene
*/

'use strict';

// REACT NATIVE PARTS
var React = require("react-native");
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");

// PERSONAL COMPONENTS
var LoginScene = require("../Scenes/LoginScene");
var MainScene = require("../Scenes/MainScene");

// ACTIONS && HOSTS
var ItemActions = require("../Actions/ItemActions");
var ItemStore = require("../Stores/ItemStore");
var HostStore = require("../Stores/HostStore");
var HostAction = require("../Actions/HostActions");

var {
	Component,
	StyleSheet,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
  },
});

var AuthScene = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.ListenerMixin],
	componentWillMount: function() {
		{ /* validate whether user is authenticated w/ Firebase */}
		this.state.isLoggedIn = false;

		var authData = this.state.db.getAuth();

		if (authData) {
			console.log("authenticated");
			this.state.isLoggedIn = true;
			var route = {
				component: MainScene,
				passProps: {
					user: authData,
				}
			}

			this.props.navigator.replace(route);
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return !nextState.isLoggedIn;
	},

	render: function() {
		return <LoginScene backend={this.state.backend} navigator={navigator} />;
	},
});

module.exports = AuthScene;