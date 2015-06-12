'use strict';

var React = require("react-native");
var NavBar = require("react-native-navbar");
var MapModule = require("../Comps/MapModule");
var ItemList = require("../Comps/ItemList");
var NavItem = require("../Comps/NavItem");

var {
	Component,
 	ListView,
 	MapView,
 	Navigator,
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
});

class MainScene extends Component {
	componentWillMount() {
		var routeParams = new Array(2);
		routeParams[true] = {};
		routeParams[false] = {
			mapParams: {
				annotations: [
					{
						latitude: 36.9735510,
						longitude: -121.9830190,
						title: "Parent's Home",
						subtitle: "Where I grew up..."
					}, {
						latitude: 36.9750338,
						longitude: -121.9820749,
						title: "Live Oak School",
						subtitle: "where it all began, school-wise"
					}
				],
				region: {
					latitude: 36.9741853,
					longitude: -121.9825684,
					latitudeDelta: 0,
					longitudeDelta: 0
				}
			}
		};

		this.state = {
			userObtained: true,
			listScene: true,
			leftButton: null,
			rightButton: null,
			routeParams: routeParams,
			scene: ItemList,
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.userObtained;
	}

	_renderScene(route, navigator) {
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
		   				{...this.props.route.passProps} />
			</View>
		);
	}

	_changeScene(navigator) {
		this.setState({
			listScene: !this.state.listScene,
			scene: this.state.listScene ? MapModule : ItemList
		});
	}

	render() {
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
								  passProps: this.state.routeParams[!this.state.listScene],
								}} />
		)
	}
}

module.exports = MainScene;