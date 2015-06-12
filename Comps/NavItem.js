'use strict'

var React = require("react-native");
var {
	Text,
	TouchableHighlight,
	View,
} = React;

var NavItem = React.createClass({
	getInitialState() {
		return {
			navItemReady: false,
			component: null,
		}
	},
	
	componentWillMount() {
			
		switch(this.props.type)  {
			case "text":
				this.setState({
					navItemReady: true,
					component: <Text>{this.props.name}</Text>
				});
				break;

			default:
				console.log("testing...");
				break;
		}
	},

	shouldComponentUpdate() {
		return this.state.navItemReady;
	},

	_changeScene() {
		debugger;
		this.props.navigator.replace(this.props.params)
	},

	render() {
		return (
			<View>
        <TouchableHighlight onPress={this._changeScene.bind(this)}
        										underlayColor="transparent">
          {this.state.component}
        </TouchableHighlight>
      </View>
		)
	}
});

module.exports = NavItem;

      