'use strict';

var AuthScene = require("./Scenes/AuthScene");
var Icons = require("react-native-vector-icons");
var React = require('react-native');

var {
  AppRegistry,
  Component,
  Navigator,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#000000",
	}
});

class App extends Component {
	constructor(props) {
		super(props);
		StatusBarIOS.setStyle(true);
  	}

  	_renderScene(route, navigator) {
  		var AuthScene = route.component;

  		return (
  			<View style={styles.container}>
  				<AuthScene navigator={navigator} route={route} />
  			</View>
  		);
  	}
 
	render() {
		return (
			<Navigator
				renderScene={this._renderScene.bind(this)}
				initialRoute={{
				  component: AuthScene
				}} />
		);
  	}
}

AppRegistry.registerComponent('whatsthat', () => App);