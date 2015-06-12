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

	render() {
		return (
			<View>
        <TouchableHighlight onPress={this.props.changeScene}
        										underlayColor="transparent">
          <Text>{this.state.component}</Text>
        </TouchableHighlight>
      </View>
		)
	}
});

module.exports = NavItem;

      