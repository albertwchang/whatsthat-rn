'use strict'

// React Native Parts
var React = require('react-native');
var Carousel = require('react-native-carousel');
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");
var TimerMixin = require('react-timer-mixin');

// Personal Components
var Votes = require('../Comps/Votes');

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
	ActivityIndicatorIOS,
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
	  color: '#FFFFFF'
	},
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#48BBEC',
	},
	loading: {
		alignItems: "center",
		height: 500,
		justifyContent: "center"
	},
	rowContainer: {
	  flexDirection: 'row',
	  margin: 10,
	},
	separator: {
	  height: 1,
	  backgroundColor: '#424242',
	  marginHorizontal: 10,
	},
	textContainer: {
	  flex: 1
	},
	thumb: {
	  width: 80,
	  height: 60,
	  marginRight: 10,
	},
	voteBox: {
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	voteBlock: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		marginRight: 10,
		marginTop: 1,
	}
});

module.exports = React.createClass({
	mixins: [TimerMixin, Reflux.connect(HostStore), Reflux.connect(UserStore)],
	getInitialState: function() {
		return {
			authors: null,
			context: null,
			ds: null,
			isLoading: true,
			items: null,
			itemDims: null,
		}
	},

	componentWillMount: function() {
		this.setState({
			context: this.props.context,
			ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid}),
		});
	},

	componentWillReceiveProps: function(nextProps) {
		var loadingStatus;

		if (nextProps.items == null)
			loadingStatus = true
		else {
			loadingStatus = false;
		}

		this.setState({
			authors: nextProps.authors,
			items: nextProps.items,
			isLoading: loadingStatus,
		});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return (!nextState.items || !nextState.items[this.state.context]);
	},

	_setDims:function(e) {
		if ( !this.state.itemDims ) {
			var layout = e.nativeEvent.layout; 
			
			this.setState({
				itemDims: {
					height: layout.height,
					width: layout.width,
				}
			});
		} else
			return;
	},

	_rowPressed: function(id, item, author) {
		this.props.route.passProps.openItemContext(id, item, author);
	},

	_renderRow: function(item, sectionId, rowId) {
		var author = this.props.authors[item.authorId];

		return (
			<TouchableHighlight
				underlayColor="#A4A4A4"
				onPress={() => this._rowPressed(rowId, item, author)}>
				
				<View accessibilityOnTap={false} onLayout={this._setDims}>
					<View style={styles.rowContainer}>
						<Image style={styles.thumb} source={{ uri: item.imgURLs.avatar }} />
						<View style={styles.textContainer}>
							<Text style={styles.itemName}>{item.name}</Text>
							<Text style={styles.author}
										numberOfLines={1}>{author.firstName} {author.lastName}
							</Text>
							<Votes
								styles={{
									voteBox: styles.voteBox,
									voteBlock: styles.voteBlock,
								}}
								key={rowId}
					   		dims={this.state.itemDims}
					   		currentUser={this.state.authenticatedUser}
						  	item={{
						  		id: rowId,
						  		value: item,
						  	}}
						  	db={this.state.db} />
						</View>
					</View>
					<View style={styles.separator} />
				</View>
			</TouchableHighlight>
		);
	},

	render: function() {
		return this.state.isLoading
			? <ActivityIndicatorIOS
				animating={this.state.isLoading}
				style={styles.loading}
				size="large" />
			: <ListView
					dataSource={this.state.ds.cloneWithRows(this.props.items)}
					style={styles.container}
					renderRow={this._renderRow} />
	},
});