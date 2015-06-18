'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");

// SCENES
var SummaryScene = require("../Scenes/SummaryScene");

// ACTIONS && STORES
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");

// Utilities
var _ = require("lodash");

var {
	Navigator,
 	NavigatorIOS,
	StyleSheet,
	TabBarIOS,
	View,
} = React;

var AppScene = React.createClass({
	getInitialState: function() {
		return {
			chosenTab: "main",
			badges: {
				"main": {
					newCnt: 0,
				},
				"add": {
					newCnt: 0,
				}
			},
		}
	},

	componentWillMount: function() {

	},

	_updateBadgeCount: function(tab, cnt) {
		this.setState((prevState, currentProps) => {
			var badges = _.transform(prevState.badges, (result, badge, key) => {
				result[tab] = {"newCnt": (tab == key) ? cnt : prevState.badges[key].newCnt};
			});
			
			return badges;
		});
	},

	_renderContent: function() {
		var component = null;

		debugger;
		
		switch(this.state.chosenTab) {
			case "main":
				component = <SummaryScene navigator={navigator}/>;
			
			case "add":
				component = <SummaryScene navigator={navigator}/>;

			case "profile":
				component = <SummaryScene navigator={navigator}/>;

			case "settings":
				component = <SummaryScene navigator={navigator}/>;

			default:
				component: <SummaryScene navigator={navigator}/>;
		}

		return component;
	},

	render: function() {
		return (
			<TabBarIOS
        tintColor="#A4A4A4"
        barTintColor="#3abeff">
        
        <TabBarIOS.Item
	        icon={require("image!items")}
					onPress={() => {
					  this.setState({
					    chosenTab: 'items',
					  });
					}}
					selected={this.state.chosenTab === 'main'}
					title="Items">{this._renderContent()}
        </TabBarIOS.Item>
        
        <TabBarIOS.Item
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          icon={require("image!add")}
          onPress={() => {
            this.setState({
              chosenTab: 'add',
              notifCount: this.state.notifCount + 1,
            });
          }}
          selected={this.state.chosenTab === "add"}
          title="Add">{this._renderContent()}
        </TabBarIOS.Item>
        
        <TabBarIOS.Item
        	icon={require("image!profile")}
          onPress={() => {
            this.setState({
              chosenTab: 'profile',
              presses: this.state.presses + 1
            });
          }}
          selected={this.state.chosenTab === 'profile'}
          title="Profile">{this._renderContent()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
        	icon={require("image!settings")}
          onPress={() => {
            this.setState({
              chosenTab: 'settings',
              presses: this.state.presses + 1
            });
          }}
          selected={this.state.chosenTab === 'settings'}
          title="Settings">{this._renderContent()}
        </TabBarIOS.Item>
      </TabBarIOS>
		);
	}
});

module.exports = AppScene;