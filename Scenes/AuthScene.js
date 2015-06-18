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
var ItemStore = require("../Stores/ItemStore");
var ItemActions = require("../Actions/ItemActions");

var HostStore = require("../Stores/HostStore");
var HostActions = require("../Actions/HostActions");

var UserStore = require("../Stores/UserStore");
var UserActions = require("../Actions/UserActions");

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
		// validate whether user is authenticated w/ Firebase
		this.state.isLoggedIn = false;

		var authData = this.state.db.getAuth();
		if (authData) {
			UserActions.fillAuthenticatedUser.triggerPromise(authData.uid).then((user) => {
				this.state.isLoggedIn = true;
				var route = {
					component: MainScene,
					passProps: {
						user: authData,
					}
				}

				this.props.navigator.replace(route);
			});
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