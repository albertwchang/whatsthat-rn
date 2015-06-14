'use strict'

// React Native Parts
var React = require('react-native');
var Carousel = require('react-native-carousel');
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");
var TimerMixin = require('react-timer-mixin');

// Personal Components

// STORES && ACTIONS
var HostStore = require("../Stores/HostStore");
var HostActions = require("../Actions/HostActions");
var ItemStore = require("../Stores/ItemStore");
var ItemActions = require("../Actions/ItemActions");
var UserStore = require("../Stores/UserStore");
var UserActions = require("../Actions/UserActions");

// Utilities
var _ = require("lodash");

var {
	Image,
 	ListView,
 	Navigator,
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	author: {
	  fontSize: 16,
	  color: '#656565'
	},
	cell: {
		backgroundColor: "red"
	},
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#48BBEC'
	},
	rowContainer: {
	  flexDirection: 'row',
	  margin: 10,
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

var ItemList = React.createClass({
	mixins: [TimerMixin, Reflux.connect(HostStore)],

	componentWillMount: function() {
		this.setState({
			ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid})
		})
	},

	_rowPressed: function(key, item) {
		console.log("testing");
	},

	_renderRow: function(item, sectionId, rowId) {
		debugger;

		var author = this.props.route.passProps.authors[item.authorId];

		return (
			<TouchableHighlight
				underlayColor="#A4A4A4"
				onPress={() => this._rowPressed(rowId, item)}>
				
				<View accessibilityOnTap={false}>
					<View style={styles.rowContainer}>
						{<Image style={styles.thumb} source={{ uri: author.imgURLs.avatar }} />}
						<View style={styles.textContainer}>
							<Text style={styles.itemName}>{item.name}</Text>
							<Text style={styles.author}
										numberOfLines={1}>{author.firstName} {author.lastName}
							</Text>
						</View>
					</View>
					<View style={styles.separator} />
				</View>
			</TouchableHighlight>
		);
		
		// return (
		// 	<View style={styles.cell}>
		// 		<Text>Testing...</Text>
		// 		<View style={styles.separator} />
		// 	</View>
		// )
	},

	render: function() {
		// var items = _.toArray(this.props.route.passProps.items);
		var items = [
			{id: 1, name: "albert"},
			{id: 2, name: "jerry"},
		];

		console.log("going to render: ", items);
		this.state.ds.cloneWithRows(items);
		debugger;
		return (
			<ListView dataSource={this.state.ds}
								style={styles.container}
								renderRow={this._renderRow} />
		)
		// 	: <Text>No Data Yet</Text>;
	},
})

module.exports = ItemList;