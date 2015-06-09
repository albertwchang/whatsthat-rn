'use strict';

var React = require("react-native");
var Carousel = require('react-native-carousel');
var Icons = require("react-native-vector-icons");
var MenuDrawer = require("rn-drawer");
var TimerMixin = require('react-timer-mixin');
var {
	Component,
	Image,
 	ListView,
	NavigatorIOS,
	StyleSheet,
	TabBarIOS,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#48BBEC'
	},
	thumb: {
	  width: 80,
	  height: 80,
	  marginRight: 10
	},
	textContainer: {
	  flex: 1
	},
	separator: {
	  height: 1,
	  backgroundColor: '#dddddd'
	},
	author: {
	  fontSize: 16,
	  color: '#656565'
	},
	rowContainer: {
	  flexDirection: 'row',
	  padding: 10
	}
});

class MainScene extends Component {
	construtor(props) {
		super(props);
	}

	componentWillMount() {
		this.state = {
			userObtained: true
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.userObtained;
	}

	render() {
		return (
			<ItemList></ItemList>
		)
	}
}

var ItemList = React.createClass({
	mixins: [TimerMixin],
	getInitialState: function() {
		return {
			items: null,
			itemsObtained: false
		};
	},

	componentWillMount: function() {
		debugger;
		this.setTimeout( () => {
			debugger;
			
		}, 500);
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return this.state.itemsObtained;
	},

	_rowPressed: function(id) {
		console.log(id);
	},

	renderRow: function(item, sectionId, rowId) {
		return (
			<TouchableHighlight
				underlayColor="#A4A4A4"
				style={styles.container}
				onPress={() => this._rowPressed(item[$id])}>
				
				<View accessibilityOnTap={false}>
					<View style={styles.rowContainer}>
						{/*<Image style={styles.thumb} source={{ uri: rowData.img_url }} />*/}
						<View style={styles.textContainer}>
							<Text style={styles.itemName}>{item.name}</Text>
							<Text style={styles.author} numberOfLines={1}>{item.authorId}</Text>
						</View>
					</View>
					<View style={styles.separator} />
				</View>
			</TouchableHighlight>
		)
	},

	render: function() {
		debugger;
		return (
			<ListView dataSource={this.state.items} renderRow={this.renderRow.bind(this)} />
		)
	},
})

module.exports = MainScene;