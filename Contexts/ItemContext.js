'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");
var NavBar = require("react-native-navbar");

// COMPONENTS
var NavBarTitle = require("../Comps/NavBarTitle");
var NavItem = require("../Comps/NavItem");

// ACTIONS && STORES
var ItemActions = require("../Actions/ItemActions");
var ItemStore = require("../Stores/ItemStore");
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");
var UserActions = require("../Actions/UserActions");
var UserStore = require("../Stores/UserStore");

// SCENES
var MapScene = require("../Scenes/MapScene");
var ItemDetailScene = require("../Scenes/ItemDetailScene");

// Utilities
var _ = require("lodash");

var {
 	Navigator,
	StyleSheet,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	main: {
		flex: 1,
	},
})

var ItemContext = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.connect(ItemStore), Reflux.connect(UserStore)],
	getInitialState: function() {
		return {
			author: this.props.route.passProps.author,
			context: this.props.route.passProps.context,
			dims: this.props.route.passProps.dims,
			imageDims: null,
			item: this.props.route.passProps.item,
			scenes: null,
			sceneIndex: 0,
		};
	},

	componentWillMount: function() {
		this.setState({
			scenes: [
				<ItemDetailScene
					currentUser={this.state.authenticatedUser}
					db={this.state.db}
					dims={this.state.dims}
					item={this.state.item}
					author={this.state.author} />,
				<MapScene
   				authors={[this.state.author]}
   				context="all"
   				dims={this.state.dims}
   				items={[this.state.item]} />
			],
		})
	},

	_changeScene: function(e) {
		this.setState({
			sceneIndex: e.nativeEvent.selectedSegmentedIndex,
		});
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

	_renderScene: function(route, navigator) {
		var navBar = null;

		if (route.navigationBar) {
		 	navBar = React.addons.cloneWithProps(route.navigationBar, {
		  	navigator: navigator,
		  	route: route
		 	});

		 	navBar._store.props.onPrev = function() {
		 		this.props.navigator.pop();
			}.bind(this);
		}

		var Scene = this.state.scenes[this.state.sceneIndex];

		return (
			<View style={styles.container}>
				{navBar}
		   	
		   	<View style={styles.main} onLayout={this._setDims}>
		   		{Scene}
		   	</View>
			</View>
		);
	},

	render: function() {
		var navBarTitle =
			<NavBarTitle
				changeScene={this._changeScene}
				sceneIndex={this.state.sceneIndex}
				width={this.state.dims.width} />;

		var navBar =
			<NavBar
				backgroundColor="#A4A4A4"
				buttonsColor="#FFFFFF"
				titleColor="#FFFFFF"
				prevTitle="Back"
				customTitle={navBarTitle} />

		return (
			<Navigator
				renderScene={this._renderScene}
				initialRoute={{
				  navigationBar: navBar,
				}} />
			)
	}
});

module.exports = ItemContext;