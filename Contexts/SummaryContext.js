'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");
var NavBar = require("react-native-navbar");

// CONTEXTS
var ItemContext = require("./ItemContext");

// SCENES
var ItemListScene = require("../Scenes/ItemListScene");
var MapScene = require("../Scenes/MapScene");

// COMPONENTS
var NavItem = require("../Comps/NavItem");

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
	ListView,
 	Navigator,
 	NavigatorIOS,
	StyleSheet,
	TabBarIOS,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	main: {
		flex: 1,
	},
	navBar: {
		backgroundColor: "#A4A4A4"
	},
	text: {
		color: "#FFFFFF"
	}
});

module.exports = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.connect(ItemStore), Reflux.ListenerMixin],
	getInitialState: function() {
		return {
			dims: null,
			itemsObtained: false,
			authorIds: [],
			authors: [],
			userObtained: true,
			listScene: true,
		};
	},

	componentWillMount: function() {
		var authorIds = null;
		var items = [];
	
		// get items and authors data from respective stores
		var itemQuery = this.state.db.child("items");

		ItemActions.getItems.triggerPromise("items", "all").then((_items) => {
			items['all'] = _items;
			authorIds = _.uniq( _.pluck(items["all"], "authorId") );
			return authorIds;
		}).then((authorIds) => {
			return UserActions.getUsers.triggerPromise("users", "all").then((users) => {
				var authors = _.transform(users, (result, author, key) => {
					if ( _.contains(authorIds, key) )
						result[key] = author;
				});

				return authors;
			});
		}).finally((authors) => {
			/*******************************************************************
			***************** Finally, process all obtained data ***************
			*******************************************************************/
			this.setState({
				items: items, /* LOOK INTO THIS LATER, SO IT DOESN'T ERASE OTHER ELEMENTS*/
				itemsObtained: true,
				authors: authors,
				authorIds: authorIds,
			});
		}).catch((err) => {
			console.log("Error: ", err);
		});
	},

	componentWillUpdate: function(nextProps, nextState) {
		if (nextState.items["all"] != null);
			// debugger;
	},
	
	_setDims: function(e) {
		if (this.state.dims == null) {
			var layout = e.nativeEvent.layout; 
			
			this.setState({
				dims: {
					height: layout.height,
					width: layout.width,
				}
			});
		} else
			return;
  },

  _openItemContext: function(id, item, author) {
  	var route = {
		  component: ItemContext,
		  passProps: {
		  	author: author,
		  	context: "all",
		  	dims: this.state.dims,
		  	item: {
		  		id: id,
		  		value: item,
		  	},
		  }
		};

  	this.props.navigator.push(route);
  },

	_renderScene: function(route, navigator) {
		var navBar = null;

		if (route.navigationBar) {
		 	navBar = React.addons.cloneWithProps(route.navigationBar, {
		  	navigator: navigator,
		  	route: route
		 	});
		}

		var Scene = this.state.listScene ? ItemListScene : MapScene;

		return (
			<View style={styles.container}>
		   	{navBar}
		   	<View style={styles.main} onLayout={this._setDims}>
			   	<Scene
	   				authors={this.state.authors}
	   				context="all"
	   				dims={this.state.dims}
	   				ds={new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid})}
	   				items={this.state.items["all"]}
	   				openItemContext={this._openItemContext}
	   				navigator={navigator}
	   				route={route} />
			  </View>
			</View>
		);
	},

	_changeScene: function() {
		this.setState({
			listScene: !this.state.listScene
		});
	},

	render: function() {
		var navItem = <NavItem
										type="text"
										name="Map"
										changeScene={this._changeScene} />;

		var navBar =
			<NavBar title="All Items"
							backgroundColor="#A4A4A4"
							buttonsColor="#FFFFFF"
							titleColor="#FFFFFF"
							customPrev={navItem} />

		return (
			<Navigator
				renderScene={this._renderScene}
				initialRoute={{
				  navigationBar: navBar,
				  passProps: {
				  	openItemContext: this._openItemContext,
				  },
				}} />
			)
	}
});