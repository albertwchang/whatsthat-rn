'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");
var NavBar = require("react-native-navbar");
var Carousel = require("react-native-carousel");

// COMPONENTS
var MapModule = require("../Comps/MapModule");
var NavItem = require("../Comps/NavItem");
var Votes = require("../Comps/Votes");

// ACTIONS && STORES
var ItemActions = require("../Actions/ItemActions");
var ItemStore = require("../Stores/ItemStore");
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");

var UserStore = require("../Stores/UserStore");
var UserActions = require("../Actions/UserActions");

// Utilities
var _ = require("lodash");

var {
	Component,
	Image,
 	Navigator,
 	SegmentedControlIOS,
	StyleSheet,
	TabBarIOS,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navBarTitle: {
		backgroundColor: "blue",
		justifyContent: "center",
		alignItems: "center",
	},
	main: {
		flex: 1,
	},
	box: {
		width: 300,
		margin: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6699FF',
  },
  image: {

  },
	text: {
		color: "#FFFFFF"
	}
});

var ItemDetailScene = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.connect(UserStore)],
	getInitialState: function() {
		return {
			dims: this.props.route.passProps.dims,
			item: this.props.route.passProps.item,
			author: this.props.route.passProps.author,
		};
	},

	componentWillMount: function() {

	},

	componentDidMount: function() {

	},

	// _setDims: function(e) {
	// 	if (this.state.dims == null) {
	// 		var layout = e.nativeEvent.layout; 
			
	// 		this.setState({
	// 			dims: {
	// 				height: layout.height,
	// 				width: layout.width,
	// 			}
	// 		});
	// 	} else
	// 		return;
 //  },

	_renderScene: function(route, navigator) {
		var navBar = null;
		var imgURL = this.state.item.value.imgURLs.base;
		var imgStyle = {
			width: this.state.dims.width,
			flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#6699FF',
	  };

		if (route.navigationBar) {
		 	navBar = React.addons.cloneWithProps(route.navigationBar, {
		  	navigator: navigator,
		  	route: route
		 	});

		 	navBar._store.props.onPrev = function() {
		 		this.props.navigator.pop();
			}.bind(this);
		}

		return (
			<View style={styles.container}>
		   	{navBar}
		   	<Carousel width={this.state.dims.width}>
	          <Image
	          	style={imgStyle}
	          	source={{ uri: imgURL }} />
	        <View style={imgStyle}>
	          <Text style={styles.text}>Image 2</Text>
	        </View>
	        <View style={imgStyle}>
	          <Text style={styles.text}>Image 3</Text>
	        </View>
		   	</Carousel>
		   	<View style={styles.main}>
			   	<Votes
			   		dims={this.state.dims}
			   		currentUser={this.state.authenticatedUser}
				  	item={this.state.item}
				  	db={this.state.db} />
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
		var navBarTitle = <NavBarTitle width={this.state.dims.width} />;

		var navBar =
			<NavBar
				title="Detail"
				backgroundColor="#A4A4A4"
				buttonsColor="#FFFFFF"
				titleColor="#FFFFFF"
				prevTitle="Back"
				customTitle={navBarTitle} />

		return (
			<Navigator
				renderScene={this._renderScene.bind(this)}
				initialRoute={{
				  navigationBar: navBar,
				}} />
			)
	}
});

var NavBarTitle = React.createClass({
	render: function() {
		var navBarStyle = {
			justifyContent: "center",
			alignItems: "center",
			width: this.props.width * 6/10,
		};

		return (
				<SegmentedControlIOS
					style={navBarStyle}
					enabled={true}
					values={["Details", "Map"]}
					selectedIndex={0}
					tintColor="red" />
		)
	}
});

module.exports = ItemDetailScene;