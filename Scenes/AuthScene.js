/*
	1. Routing used for Login vs. Registration
	2. Navigator replace used to bring up Main Scene
*/

'use strict';

// REACT NATIVE PARTS
var React = require("react-native");
var Icons = require("react-native-vector-icons");

// 3RD PARTY SYSETMS
var Firebase = require("firebase");

// PERSONAL COMPONENTS
var LoginScene = require("../Scenes/LoginScene");
var MainScene = require("../Scenes/MainScene");
// var TestScene = require("../Comps/TestScene");

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
	componentWillMount: function() {
		this.state = {
			backend: "shit",
			isLoggedIn: false
		};

		{ /* validate whether user is authenticated w/ Firebase */}
		this.state = {
			backend: new Firebase("https://whatsthat.firebaseIO.com"),
			isLoggedIn: false
		};

		var authData = this.state.backend.getAuth();

		if (authData) {
			console.log("authenticated");
			this.state.isLoggedIn = true;
			var route = {
				component: MainScene,
				// component: TestScene,
				passProps: {
					user: authData,
					backend: this.state.backend
				}
			}

			this.props.navigator.replace(route);
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return !nextState.isLoggedIn;
	},

	render: function() {
		return <LoginScene backend={this.state.backend} />;
	},
});

module.exports = AuthScene;