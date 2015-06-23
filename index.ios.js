'use strict';

// REACT NATIVE PARTS
var React = require("react-native");

// PERSONAL COMPONENTS
var AuthContext = require("./Contexts/AuthContext");

var {
  AppRegistry,
  Navigator,
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

var App = React.createClass({
  _renderContext: function(route, navigator) {
    var Scene = route.component;

    return (
      <Scene
        navigator={navigator}
        route={route} />
    );
  },

  render: function() {
    return (
      <Navigator
        renderScene={this._renderContext}
        initialRoute={{
          component: AuthContext,
        }} />
    );
  },
});

AppRegistry.registerComponent('whatsthat', () => App);