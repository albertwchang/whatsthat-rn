'use strict'

// React Native Parts 
var React = require('react-native');
var Camera = require('react-native-camera');
var Icon = require("FontAwesome");
var Reflux = require("reflux");

// SCENES
var Votes = require("../Comps/Votes");
var ItemListScene = require("./ItemListScene");

// ACTIONS && STORES
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");
var ItemActions = require("../Actions/ItemActions");
var ItemStore = require("../Stores/ItemStore");
var UserActions = require("../Actions/UserActions");
var UserStore = require("../Stores/UserStore");

// Utilities
var _ = require("lodash");

var {
	Image,
 	ListView,
 	Navigator,
 	ScrollView,
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	icon: {

	},
	main: {
		flex: 1,
		justifyContent: "center",
	},
	menuItem: {
		flexDirection: "row",
		color: "#FFFFFF",
		fontFamily: "helvetica neue",
	},
	menuItemIcon: {
		color: "#FFBF00",
		justifyContent: "flex-end",
		flex: 1,
		fontSize: 26,
		fontWeight: "100",
		paddingHorizontal: 8,
		paddingVertical: 16,
	},
	menuItemText: {
		color: "yellow",
		fontFamily: "helvetica neue",
		fontWeight: "100",
		fontSize: 26,
		flex: 5,
		letterSpacing: 1,
		paddingHorizontal: 8,
		paddingVertical: 14,
	},
	menuSection: {
		flex: 1,
		margin: 10,
	},
	rowContainer: {
	  color: "#FFFFFF",
	  flexDirection: 'row',
	  margin: 14,
	},
	separator: {
	  height: 0.5,
	  backgroundColor: 'red',
	  margin: 10,
	},
})

var UserMenuScene = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.connect(UserStore)],

	_changeProfileImg: function() {
		this.setState({
			isCameraOn: true,
		})

	},

	_logout: function() {
		UserActions.logoutUser();
		this.props.setContext(false);	
	},

	_openScene: function(id, targetScene) {
		console.log("testing");
	},

	_switchCamera: function() {
		// ? <Camera
	 //        ref="cam"
	 //        style={styles.container}
	 //        type={Camera.constants.Type.front}>
	 //        <TouchableHighlight onPress={this._switchCamera}>
	 //          <Text>The old switcheroo</Text>
	 //        </TouchableHighlight>
	 //        <TouchableHighlight onPress={this._takePicture}>
	 //          <Text>Take Picture</Text>
	 //        </TouchableHighlight>
	 //      </Camera>
	},

	_takePicture: function() {

	},

	render: function() {
		var imgSection, imgStyle;
		var imgWidth;

		if (this.props.dims != null) {
			imgWidth = this.props.dims.width * 2 / 3;
			imgStyle = {
				borderRadius: 6,
				borderWidth: 0.5,
				borderColor: "#A4A4A4",
				alignSelf: "center",
				flex: 1,
				height: imgWidth * 3/4,
				opacity: 0.65,
				width: imgWidth,
			};

			imgSection = {
				paddingVertical: this.props.dims.width / 12,
				borderBottomWidth: 0.5,
				borderColor: "#E6E6E6",
			};
		}

		return (
			<ScrollView
        scrollEventThrottle={200}
        contentContainerStyle={styles.main}>
	   		<TouchableHighlight
					onPress={this._changeProfileImg}
					style={imgSection}>
					<Image
						style={imgStyle}
          	source={{ uri: this.state.authenticatedUser.value.imgURLs.base }} />
        </TouchableHighlight>
        <View style={styles.menuSection}>
					<TouchableHighlight
						onPress={() => this._openScene(ItemListScene)}>
						<View style={styles.menuItem}>
    					<Icon
								name="pencil"
								style={styles.menuItemIcon} />
        			<Text style={styles.menuItemText}>Edit Info</Text>
        		</View>
	        </TouchableHighlight>
	        <TouchableHighlight
						onPress={() => this._openScene(ItemListScene)}>
	        	<View style={styles.menuItem}>
	  					<Icon
								name="list"
								style={styles.menuItemIcon} />
	        		<Text style={styles.menuItemText}>Past Items</Text>
	        	</View>
	        </TouchableHighlight>
	        <TouchableHighlight
						onPress={() => this._openScene(ItemListScene)}>
	        	<View style={styles.menuItem}>
	  					<Icon
								name="key"
								style={styles.menuItemIcon} />
	        		<Text style={styles.menuItemText}>Manage Password</Text>
	        	</View>
	        </TouchableHighlight>
	        <TouchableHighlight
						onPress={this._logout}>
	        	<View style={styles.menuItem}>
	  					<Icon
								name="lock"
								style={styles.menuItemIcon} />
	        		<Text style={styles.menuItemText}>Logout</Text>
	        	</View>
	        </TouchableHighlight>
        </View>
			</ScrollView>
		)
	},
});

module.exports = UserMenuScene;