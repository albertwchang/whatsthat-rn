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
var LoginComp = require("../Comps/LoginComp");
var RegisterComp = require("../Comps/RegisterComp");

// ACTIONS && HOSTS
var HostStore = require("../Stores/HostStore");
var HostActions = require("../Actions/HostActions");

var {
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
  getInitialState: function() {
    return {
      preferredScene: "login",
    };
  },

  render: function() {
    var component = (this.state.preferredScene == "login")
    	? <LoginComp navigator={navigator} />
    	: <RegisterComp navigator={navigator} />;
    
    return (component);
  },
});

module.exports = AuthScene;