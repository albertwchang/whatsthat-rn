'use strict';

var React = require("react-native");
var ItemStore = require("../Stores/ItemStore");
var ItemActions = require("../Actions/ItemActions");
var HostActions = require("../Actions/HostActions");

var {
	Component,
	Image,
 	ListView,
 	Navigator,
	NavigatorIOS,
	StyleSheet,
	TabBarIOS,
	TouchableHighlight,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	author: {
	  fontSize: 16,
	  color: '#656565'
	},
	container: {
		flex: 1
	},
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#48BBEC'
	},
	navBar: {
		backgroundColor: "#A4A4A4"
	},
	rowContainer: {
	  flexDirection: 'row',
	  padding: 10
	},
	separator: {
	  height: 1,
	  backgroundColor: '#dddddd',
	  marginHorizontal: 10,
	},
	textContainer: {
	  flex: 1
	},
	thumb: {
	  width: 80,
	  height: 80,
	  marginRight: 10
	},
});

class TestScene extends Component {
	init(props) {
		super(props);

	}

	componentWillMount() {
	}

	componentDidMount() {
		
		ItemActions.one(2);
		ItemActions.two(2);
		ItemActions.three(4);
		// HostActions.test(5);
		debugger;	
	}

	render() {	
		return (
			<Text>Testing...</Text>
		)
	}
}


module.exports = TestScene;