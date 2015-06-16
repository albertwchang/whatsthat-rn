'use strict';

var React = require("react-native");
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");
var MainScene = require("./MainScene");
var HostStore = require("../Stores/HostStore");

var {
	Component,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View,
} = React;

var styles = StyleSheet.create({
	buttonText: {
		fontSize: 18,
		color: 'yellow',
		alignSelf: 'center'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000',
		paddingRight: 25,
		paddingLeft: 25,
	},
	input: {
		height: 40,
		borderColor: "blue",
		color: "white",
		borderWidth: 1
	}
});

var LoginScene = React.createClass({
	mixins: [Reflux.connect(HostStore)],
	
	componentWillMount: function() {
		this.setState({
			creds: {
				email: "",
				password: "",
			}
		})
	},

	_processLogin: function(event) {
		this.state.db.authWithPassword(this.state.creds, (err, authData) => {
			if (authData) {
				console.log("authenticated");
				var route = {
					component: MainScene,
					passProps: {
						user: authData
					}
				}


				debugger;



				
				this.setState({
					isLoggedIn: true
				});

				

				this.props.navigator.replace(route);
			} else {
				debugger;
				console.log("Error logging in...");
			}
		});
	},

	_updateEmail: function(e) {
		this.setState({
			creds: {
				email: e.nativeEvent.text,
				password: this.state.creds.password
			}
		});
	},

	_updatepassword: function(e) {
		this.setState({
			creds: {
				email: this.state.creds.email,
				password: e.nativeEvent.text,
			}
		});
	},

	render: function() {
		return (
			<View style={styles.container}>
				<TextInput onChange={this._updateEmail.bind(this)} style={styles.input} />
				<TextInput onChange={this._updatepassword.bind(this)} style={styles.input} />
				<TouchableHighlight onPress={this._processLogin.bind(this)} navigator={navigator}>
					<Text style={styles.buttonText}>Go</Text>
				</TouchableHighlight>
			</View>
		);
	}
})

module.exports = LoginScene;