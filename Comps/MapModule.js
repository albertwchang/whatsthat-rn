'use strict'

var React = require('react-native');

var {
 	MapView,
	StyleSheet,
} = React;

var styles = StyleSheet.create({
	map: {
		flex: 1,
		height: 400
	}
})

var MapScene = React.createClass({
	getInitialState: function() {
		return {
			mapParams: {
				annotations: [
					{
						latitude: 36.9735510,
						longitude: -121.9830190,
						title: "Parent's Home",
						subtitle: "Where I grew up..."
					}, {
						latitude: 36.9750338,
						longitude: -121.9820749,
						title: "Live Oak School",
						subtitle: "where it all began, school-wise"
					}
				],
				region: {
					latitude: 36.9741853,
					longitude: -121.9825684,
					latitudeDelta: 0,
					longitudeDelta: 0
				}
			}
		}
	},

	render: function() {
		var mapParams = this.props.route.passProps.mapParams;

		return (
			<MapView style={styles.map}
							annotations={this.state.mapParams.annotations}
							region={this.state.mapParams.region} />
		);
	}
})

module.exports = MapScene;