'use strict';

var React = require("react-native");
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");
var AppScene = require("../Scenes/AppScene");

// ACTIONS && HOSTS
var HostStore = require("../Stores/HostStore");

var {
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
		alignItems: 'center',
		justifyContent: 'center',
		paddingRight: 25,
		paddingLeft: 25,
		borderWidth: 1,
		borderColor: "red",
    backgroundColor: "#000000",
	},
	input: {
		height: 40,
		borderColor: "blue",
		color: "white",
		borderWidth: 1
	}
});

var LoginComp = React.createClass({
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
				var route = {
					component: AppScene,
				};
				
				this.setState({
					isLoggedIn: true
				});

				debugger;

				this.props.navigator.replace(route);
			} else {
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
				<TouchableHighlight onPress={ () => { this._processLogin({navigator}) } }>
					<Text style={styles.buttonText}>Go</Text>
				</TouchableHighlight>
			</View>
		);
	}
})

module.exports = LoginComp;