'use strict'

// React Native Parts
var React = require('react-native');
var Carousel = require('react-native-carousel');
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");
var TimerMixin = require('react-timer-mixin');

// Personal Components
var HostStore = require("../Stores/HostStore");
var HostActions = require("../Actions/HostActions");

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
	mixins: [TimerMixin, Reflux.connect(HostStore, "imgHostURL")],
	getInitialState: function() {
		return {
			items: [],
			itemsObtained: false,
			authorIds: [],
			authors: [],
		};
	},

	componentWillMount: function() {
		// get Host Image URL
		HostActions.setImgHostURL(["whatsthat","items","avatar"]);

		// Get one time dump of data of items and related users
		var query = "";
		var authorIds = null;
		var items = null;

		// obtain ITEMS
		var qItems = new Promise((resolve, reject) => {
			this.props.backend.child("/items").once("value", (data) => {
				resolve( items = data.val() );
			}, (err) => {
				reject(err);
			});
		});


		// obtain AUTHORS
		qItems.then((items) => {
			authorIds = _.uniq( _.pluck(items, "authorId") );
			
			var qAuthors = new Promise((resolve, reject) => {
				this.props.backend.child("/users").once("value", (data) => {
					var authors = _.transform(data.val(), (result, author, key) => {
						if ( _.contains(authorIds, key) )
							result[key] = author;
					})

					resolve(authors);
				}, (err) => {
					reject(err);
				});
			});

			return qAuthors;
		}).finally((authors) => {
			// finalize list view
			var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});

			this.setState({
				items: dataSource.cloneWithRows(items),
				itemsObtained: true,
				authors: authors,
				authorIds: authorIds,
			});
		}).catch((err) => {
			console.log("Error: ", err);
		})
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return nextState.itemsObtained;
	},

	_rowPressed: function(key, item) {
		console.log("testing");
	},

	renderRow: function(item, sectionId, rowId) {
		var author = this.state.authors[item.authorId];
		var imgURL = this.state.imgHostURL +item.filename;
		
		console.log(this.state.imgHostURL.imgHostURL);
		return (
			<TouchableHighlight
				underlayColor="#A4A4A4"
				onPress={() => this._rowPressed(rowId, item)}>
				
				<View accessibilityOnTap={false}>
					<View style={styles.rowContainer}>
						{<Image style={styles.thumb} source={{ uri: imgURL }} />}
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
		)
	},

	render: function() {
		var content = this.state.itemsObtained
			? <ListView dataSource={this.state.items}
									style={styles.container}
									renderRow={this.renderRow.bind(this)} />
			: <Text>No Data Yet</Text>;

		return (content);
	},
})

module.exports = ItemList;