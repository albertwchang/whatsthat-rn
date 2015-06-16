'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");
var NavBar = require("react-native-navbar");
var Carousel = require("react-native-carousel");

// COMPONENTS
var MapModule = require("../Comps/MapModule");
var NavItem = require("../Comps/NavItem");

// ACTIONS && STORES
var ItemActions = require("../Actions/ItemActions");
var ItemStore = require("../Stores/ItemStore");
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");

// Utilities
var _ = require("lodash");

var {
	Component,
 	Navigator,
	StyleSheet,
	TabBarIOS,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navBar: {
		backgroundColor: "#A4A4A4"
	},
	main: {
		flex: 1,
	},
	box: {
		width: 300,
		margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6699FF',
  },
	text: {
		color: "#FFFFFF"
	}
});

var ItemDetailScene = React.createClass({
	mixins: [Reflux.connect(HostStore)],
	getInitialState: function() {
		debugger;
		return {
			dims: this.props.route.passProps.dims,
			item: this.props.route.passProps.item,
			author: this.props.route.passProps.author,
		};
	},

	componentWillMount: function() {
		//
	},

	componentDidMount: function() {

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

		debugger;

		return (
			<View style={styles.container}>
		   	{navBar}
		   	<Carousel width={this.state.dims.width} onLayout={this._setDims}>
		   		<View style={styles.box}>
	          <Text style={{color: "#FFFFFF"}}>Page 1</Text>
	        </View>
	        <View style={styles.box}>
	          <Text style={styles.text}>Page 2</Text>
	        </View>
	        <View style={styles.box}>
	          <Text style={styles.text}>Page 3</Text>
	        </View>
		   	</Carousel>
		   	<View style={styles.main}>
			   	<Text>Details scene...</Text>
			  </View>
			</View>
		);
	},

	_changeScene: function(navigator) {
		this.setState({
			listScene: !this.state.listScene,
			scene: this.state.listScene ? MapModule : ItemList
		});
	},

	render: function() {
		var navBar =
			<NavBar
				title="Detail"
				backgroundColor="#A4A4A4"
				buttonsColor="#FFFFFF"
				titleColor="#FFFFFF"
				prevTitle="Back" />

		return (
			<Navigator
				renderScene={this._renderScene.bind(this)}
				initialRoute={{
				  navigationBar: navBar,
				}} />
			)
	}
});

module.exports = ItemDetailScene;