'use strict';

// REACT NATIVE PARTS
var React = require("react-native");
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");

// PERSONAL COMPONENTS
var AuthContext = require("./Contexts/AuthContext");
var AppContext = require("./Contexts/AppContext");

// ACTIONS && HOSTS
var HostStore = require("./Stores/HostStore");
var HostActions = require("./Actions/HostActions");

var UserStore = require("./Stores/UserStore");
var UserActions = require("./Actions/UserActions");

// Utilities
var _ = require("lodash");

var {
  AppRegistry,
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
  mixins: [Reflux.connect(HostStore), Reflux.connect(UserStore), Reflux.ListenerMixin],
  getInitialState: function() {
    return {
      contextLoaded: false,
    };
  },

  componentWillMount: function() {
    // validate whether user is authenticated w/ Firebase
    var authData = this.state.db.getAuth();

    if (authData) {
      UserActions.fillAuthenticatedUser.triggerPromise(authData.uid).then((user) => {
        this.setState({
          authenticatedUser: user,
          contextLoaded: true,
        });
      }).catch((err) => {
        /*
        err doesn't necessarily mean user wasn't logged in.
        Look at using AsyncStorage for user
        */
      })
    } else {
      this.setState({
        authenticatedUser: "",
        contextLoaded: true,
      });
    }
  },

  render: function() {
    var context;

    if (this.state.authenticatedUser == null)
      context = <View><Text>Loading</Text></View>;
    else if ( _.has(this.state.authenticatedUser, "value") )
      context = <AppContext />;
    else
      context = <AuthContext />;
    
    return (context);
  },
});

AppRegistry.registerComponent('whatsthat', () => App);