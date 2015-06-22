'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");
var NavBar = require("react-native-navbar");
var Carousel = require("react-native-carousel");

// COMPONENTS
var NavBarTitle = require("../Comps/NavBarTitle");
var NavItem = require("../Comps/NavItem");
var Votes = require("../Comps/Votes");

// ACTIONS && STORES
var ItemActions = require("../Actions/ItemActions");
var ItemStore = require("../Stores/ItemStore");
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");
var UserActions = require("../Actions/UserActions");
var UserStore = require("../Stores/UserStore");

// VIEWS
var MapScene = require("../Scenes/MapScene");

// Utilities
var _ = require("lodash");

var {
	Image,
 	Navigator,
 	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} = React;

var styles = StyleSheet.create({
	authorSection: {
	  flexDirection: 'row',
	},
	authorName: {
		color: "#FF0000",
		flex: 1,
		fontFamily: "Helvetica Neue",
		fontSize: 16,
		fontWeight: "bold",
	},
	box: {
		width: 300,
		margin: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6699FF',
  },
	desc: {
		fontFamily: "Helvetica Neue",
		fontSize: 17,
		fontWeight: "300",
  },
	itemMeta: {
		color: "#FF0000",
		flex: 1,
		fontFamily: "Helvetica Neue",
		fontSize: 14,
	},
	navBarTitle: {
		backgroundColor: "blue",
		justifyContent: "center",
		alignItems: "center",
	},
	main: {
		flex: 1,
		margin: 12,
	},
  image: {
  	flex: 1,
  	height: 500,
  },
  name: {
		fontFamily: "Helvetica Neue",
		fontSize: 20,
		fontWeight: "bold",
  },
  scrollView: {
  	flex: 1,
  },
  separator: {
	  height: 1,
	  backgroundColor: '#424242',
	  marginHorizontal: 4,
	},
	text: {
		color: "#FFFFFF"
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
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#A4A4A4",
		borderRadius: 5,
		borderWidth: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
	voteBlock: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		marginHorizontal: 15,
		marginVertical: 10,
	},
});

var ItemDetailScene = React.createClass({
	getInitialState: function() {
		return {
			dims: this.props.dims,
			imageDims: null,
		};
	},

	_getDims: function(e) {
		this.setState({
			imageDims: e.nativeEvent.layout
		});
	},

	_openProfile: function(userId) {
		console.log("user: ", userId);
	},

	render: function() {
		var navBar = null;
		var item = this.props.item.value;
		var author = this.props.author;
		var imgDims = this.state.imageDims;
		var imgStyle = {
			alignItems: 'center',
	    backgroundColor: '#6699FF',
	    flex: 1,
	    height: _.has(imgDims, "width") ? imgDims.width * 3/4 : 0,
	    justifyContent: 'center',
	    resizeMode: "contain",
	    width: this.props.dims.width,
	  };

		return (
	   	<ScrollView
	   		contentInset={{top: -20}}
        scrollEventThrottle={200}>
		   	<Carousel>
          <Image
          	onLayout={this._getDims}
          	style={imgStyle}
          	source={{ uri: item.imgURLs.base }} />
	        <View style={imgStyle}>
	          <Text
	          	style={styles.text}>Image 2
	          </Text>
	        </View>
	        <View style={imgStyle}>
	          <Text style={styles.text}>Image 3</Text>
	        </View>
		   	</Carousel>
		   	<View style={styles.main}>
			   	<Votes
			   		styles={{
							voteBox: styles.voteBox,
							voteBlock: styles.voteBlock,
						}}
			   		dims={this.props.dims}
			   		currentUser={this.props.currentUser}
				  	item={this.props.item}
				  	db={this.props.db} />
				</View>
				<View style={styles.main}>
				  <Text style={styles.name}>{item.name}</Text>
				  <Text style={styles.desc}>{item.desc}</Text>
				</View>
				<View style={styles.separator} />
				<View style={styles.main}>
				  <TouchableHighlight
						underlayColor="#A4A4A4"
						onPress={() => this._openProfile(author.key)}>
						<View style={styles.authorSection}>
							<Image style={styles.thumb} source={{ uri: author.imgURLs.avatar }} />
							<View style={styles.textContainer}>
								<Text style={styles.authorName}>{author.firstName} {author.lastName}</Text>
								<Text style={styles.itemMeta}>Date</Text>
								<Text style={styles.itemMeta}>City, State</Text>
							</View>
						</View>
					</TouchableHighlight>
			  </View>
			</ScrollView>
		);
	}
});

module.exports = ItemDetailScene;