'use strict';

var React = require("react-native");
var Icons = require("react-native-vector-icons");
var MainScene = require("./MainScene");

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

class LoginScene extends Component {
	construtor(props) {
		super(props);
	}

	componentWillMount() {
		this.state = {
			creds: {
				email: "",
				password: "",
			}
		}
	}

	_processLogin(event) {
		debugger;
		this.props.backend.authWithPassword(this.state.creds, function(err, authData) {
			if (authData) {
				console.log("authenticated");
				this.state.isLoggedIn = true;
				var route = {
					component: MainScene,
				}

				this.props.navigator.replace(route);
			} else {
				console.log("Error logging in...");
			}
		})
	}

	_updateEmail(e) {
		this.setState({
			creds: {
				email: e.nativeEvent.text,
				password: this.state.creds.password
			}
		});
	}

	_updatepassword(e) {
		this.setState({
			creds: {
				email: this.state.creds.email,
				password: e.nativeEvent.text,
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput onChange={this._updateEmail.bind(this)} style={styles.input} />
				<TextInput onChange={this._updatepassword.bind(this)} style={styles.input} />
				<TouchableHighlight onPress={this._processLogin.bind(this)} >
					<Text style={styles.buttonText}>Go</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

module.exports = LoginScene;