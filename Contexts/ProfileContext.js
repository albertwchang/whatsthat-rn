'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");

// SCENES
var UserMenuScene = require("../Scenes/UserMenuScene");

// COMPONENTS
var NavItem = require("../Comps/NavItem");

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
	ListView,
 	Navigator,
 	NavigatorIOS,
	StyleSheet,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	main: {
		flex: 1,
	},
	navBar: {
		backgroundColor: "#A4A4A4"
	},
	text: {
		color: "#FFFFFF"
	}
});

var ProfileContext = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.connect(ItemStore), Reflux.ListenerMixin],
	getInitialState: function() {
		return {
			dims: null,
		};
	},
	
	_setDims: function(e) {
		if (this.state.dims == null) {
			var layout = e.nativeEvent.layout; 
			
			this.setState({
				dims: {
					height: layout.height,
					width: layout.width,
				}
			});
		} else
			return;
  },

  _openItemContext: function() {
  	var route = {
		  component: UserMenuScene,
		  passProps: {
		  	
		  }
		};

  	this.props.navigator.push(route);
  },

	_renderScene: function(route, navigator) {
		var Scene = route.component;

		return (
			<View style={styles.container}>
		   	<View style={styles.main} onLayout={this._setDims}>
			   	<Scene
			   		dims={this.state.dims}
	   				navigator={navigator}
	   				route={route} />
			  </View>
			</View>
		);
	},

	render: function() {
		return (
			<Navigator
				renderScene={this._renderScene}
				initialRoute={{
					component: UserMenuScene,
				  passProps: {
				  	openItemContext: this._openItemContext,
				  },
				}} />
		)
	}
})

module.exports = ProfileContext;