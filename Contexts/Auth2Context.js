'use strict';

// REACT NATIVE PARTS
var React = require("react-native");
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");

// PERSONAL COMPONENTS
var LoginScene = require("../Scenes/LoginScene");
var RegisterScene = require("../Scenes/RegisterScene");
var AppContext = require("./AppContext");

// ACTIONS && HOSTS
var HostStore = require("../Stores/HostStore");
var HostActions = require("../Actions/HostActions");

var UserStore = require("../Stores/UserStore");
var UserActions = require("../Actions/UserActions");

var {
  Component,
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

class Auth2Context extends Component {
  componentWillMount() {
    // validate whether user is authenticated w/ Firebase
    var authData = this.state.db.getAuth();
    this.mixins = [Reflux.connect(HostStore), Reflux.ListenerMixin];
    this.state = {
      preferredScene: "login"
    }

    if (authData) {
      var route = {
        component: AppContext,
      };

      this.props.navigator.replace(route);

      UserActions.fillAuthenticatedUser.triggerPromise(authData.uid).catch((err) => {
        /*
        err doesn't necessarily mean user wasn't logged in.
        Look at using AsyncStorage for user
        */
      });
    }
  }

  _renderScene(route, navigator) {
    var Scene = route.component;

    return (
      <Scene
        navigator={navigator}
        route={route} />
    );
  }

  render() {
    debugger;
    return (
      <Navigator
        renderScene={this._renderScene}
        initialRoute={{
          component: LoginScene,
        }} />
    )
  }
};

module.exports = Auth2Context;