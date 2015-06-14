'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");
var NavBar = require("react-native-navbar");

// COMPONENTS
var MapModule = require("../Comps/MapModule");
var ItemList = require("../Comps/ItemList");
var NavItem = require("../Comps/NavItem");

// ACTIONS && STORES
var ItemActions = require("../Actions/ItemActions");
var ItemStore = require("../Stores/ItemStore");
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");

// Utilities
var _ = require("lodash");

var {
	Component,
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
	navBar: {
		backgroundColor: "#A4A4A4"
	},
	text: {
		color: "#FFFFFF"
	}
});

var MainScene = React.createClass({
	mixins: [Reflux.connect(HostStore)],
	getInitialState: function() {
		return {
			items: null,
			itemsObtained: false,
			authorIds: [],
			authors: [],
			userObtained: true,
			listScene: true,
			scene: ItemList,
		};
	},

	componentWillMount: function() {
		// {
		// 	mapParams: {
		// 		annotations: [
		// 			{
		// 				latitude: 36.9735510,
		// 				longitude: -121.9830190,
		// 				title: "Parent's Home",
		// 				subtitle: "Where I grew up..."
		// 			}, {
		// 				latitude: 36.9750338,
		// 				longitude: -121.9820749,
		// 				title: "Live Oak School",
		// 				subtitle: "where it all began, school-wise"
		// 			}
		// 		],
		// 		region: {
		// 			latitude: 36.9741853,
		// 			longitude: -121.9825684,
		// 			latitudeDelta: 0,
		// 			longitudeDelta: 0
		// 		}
		// 	}
		// };

		
		var authorIds = null;
		var items = null;
	
		// get items and authors data from respective stores
		var itemQuery = this.state.db.child("items");

		var qItems = new Promise((resolve, reject) => {
			itemQuery.once("value", (data) => {
				resolve(items = data.val());
			}, (err) => {
				console.log(err);
				reject(err);
			});
		});

		qItems.then((items) => {
			authorIds = _.uniq( _.pluck(items, "authorId") );
			return authorIds
		}).then((authorIds) => {
			var query = this.state.db.child("users");
			var qAuthors = new Promise((resolve, rejected) => {
				query.once("value", (data) => {
					var authors = _.transform(data.val(), (result, author, key) => {
						if ( _.contains(authorIds, key) )
							result[key] = author;
					});

					resolve(authors);
				}, (err) => {
					reject(err);
				});	
			})
			
			return qAuthors;
		}).finally((authors) => {
			/*******************************************************************
			***************** Finally, process all obtained data ***************
			*******************************************************************/
			this.setState({
				items: items,
				itemsObtained: true,
				authors: authors,
				authorIds: authorIds,
			});
		}).catch((err) => {
			console.log("Error: ", err);
		});
	},

	// shouldComponentUpdate: function(nextProps, nextState) {
	// 	// return nextState.userObtained;
	// 	return nextState.itemsObtained
	// },

	_renderScene: function(route, navigator) {

		var Scene = this.state.scene;
		var navBar = null;

		if (route.navigationBar) {
		 	navBar = React.addons.cloneWithProps(route.navigationBar, {
		  	navigator: navigator,
		  	route: route
		 	});
		}

		return (
			<View>
		   	{navBar}
		   	<Scene navigator={navigator}
		   				route={route}
		   				authors={this.state.authors}
		   				items={this.state.items}
		   				{...this.props.route.passProps} />
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
		var navItem = <NavItem type="text"
													name="Map"
													changeScene={this._changeScene.bind(this)} />;

		var navBar =
			<NavBar title="All Items"
							backgroundColor="#A4A4A4"
							buttonsColor="#FFFFFF"
							titleColor="#FFFFFF"
							customPrev={navItem} />

		return (
			<Navigator renderScene={this._renderScene.bind(this)}
								initialRoute={{
								  component: this.state.scene,
								  navigationBar: navBar,
								}} />
			)
	}
});

module.exports = MainScene;