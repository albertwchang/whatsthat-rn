'use strict'

var React = require('react-native');
var NavBar = require("react-native-navbar");

var {
	Component,
 	MapView,
 	Navigator,
	StyleSheet,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 568,
	},
	map: {
		flex: 1,
		height: 500
	},
	navBar: {
		backgroundColor: "#A4A4A4"
	},
})

var MapScene = React.createClass({
	_renderScene: function(route, navigator) {
		var MapScene = route.component;
		var navBar = route.navigationBar;
		var mapParams = this.props.route.passProps.mapParams;

		if (navBar) {
		 	navBar = React.addons.cloneWithProps(navBar, {
		  	navigator: navigator,
		  	route: route
		 	});
		}

		return (
			<View style={styles.container}>
		   	{navBar}
		   	<MapScene style={{backgroundColor: "#FFFFFF"}}
		   						annotations={mapParams.annotations}
		   						region={mapParams.region} />

			</View>
		);
	},

	render: function() {
		var navBar = <NavBar title="Map View"
													backgroundColor="blue"
													buttonsColor="#FFFFFF"
													titleColor="#FFFFFF" />
		return (
			<Navigator renderScene={this._renderScene}
								initialRoute={{
								  component: MapView,
								  navigationBar: navBar,
								}} />
		);
	}
})

module.exports = MapScene;