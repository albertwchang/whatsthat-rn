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
  Navigator,
	StyleSheet,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

var AuthScene = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.ListenerMixin],
  getInitialState: function() {
    return {
      preferredScene: "login",
    };
  },

  _renderScene: function(route, navigator) {
    var Scene = route.component;

    return (
      <Scene
        navigator={navigator}
        route={route} />
    );
  },

  render: function() {
    var component = (this.state.preferredScene == "login") ? LoginComp : RegisterComp;
    
    return (
      <Navigator
        renderScene={this._renderScene.bind(this)}
        initialRoute={{
          component: component,
        }} />
    );
  },
});

module.exports = AuthScene;