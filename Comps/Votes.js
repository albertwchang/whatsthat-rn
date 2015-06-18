var React = require("react-native");
var Icon = require('FontAwesome');

// Utilities
var _ = require("lodash");

var {
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		borderColor: "#A4A4A4",
		borderRadius: 3,
		borderWidth: 1,
		flexDirection: "row",
		margin: 6,
		alignItems: "center",
		justifyContent: "center",
	},
	block: {
		alignItems: "center",
		borderColor: "red",
		borderWidth: 1,
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		margin: 14,
	},
});

var Votes = React.createClass({
	getInitialState: function() {
		return {
			dbRef: {
				item: this.props.db.child("items/" +this.props.item.id),
				user: this.props.db.child("users/" +this.props.currentUser.key),
			},
			widthToFontRatio: 20,
			widthToIconRatio: 8,
		}
	},

	componentWillMount: function() {
	// Check whether the currentUser has already voted
		// function alreadyVoted() {
    	
  //   	if ( _.has(currentUser, "votes") ) {
  //   		var userVote = _.findWhere(currentUser.votes, {"itemId": itemId});
  //   		return (userVote.direction == vote);
  //   	} else
  //   	 return false;
  //   }
	},

	_placeVote: function(voteDirection) {
		var currentUser = this.props.currentUser.value;
		var item = this.props.item;
		var userVoteIndex = -1;

    // previous vote exists
    var oldUserVote = oldUserVote();

    if (oldUserVote) {
    	// update old vote to new vote
      addVoteToItem(voteDirection);
      subtractVoteFromItem(voteDirection);
      updateUserVotes(userVoteIndex, direction);
    } else { // no previous vote -- this is a new vote
      addVoteToItem(voteDirection);
      addToUserVotes(voteDirection);
    }

    // check if previous vote exists
		function oldUserVote() {
			if ( _.has(currentUser, "votes") ) {
				userVoteIndex = getUserVoteIndex(item.id);
				return _.findWhere(currentUser.votes, {"itemId": item.id});
			} else
				return undefined;
		}

		function addVoteToItem(direction) {
			/*
				the item's "vote" array will always have "up" &&
				"down" properties
			*/

			item.value.votes[direction]++;
		}

		function addToUserVotes(direction) {
			var newVote = {
        direction: direction,
        itemId: item.id
      };

      if ( !_.has(currentUser, "votes") ) {
      	_.extend(currentUser, {"votes": [newVote]});
      } else {
      	currentUser.votes.push(newVote);
			}
		}

		function subtractVoteFromItem(direction) {
			var directionToSubtract = "up" ? "down" : "up";
			item.value.votes[directionToSubtract]--;
		}

		function updateUserVotes(voteIndex, newDirection) {
			currentUser.votes[voteIndex].direction = newDirection;
		}

		function getUserVoteIndex(itemId) {
      return _.findIndex(currentUser.votes, function(vote) {
        return vote.itemId == itemId;
      });
    }

    debugger;
    // update || create user's vote list
    if (userVoteIndex > -1)
    	this.state.dbRef.user.child("votes" +userVoteIndex).update(currentUser.votes[userVoteIndex]);
    else
    	this.state.dbRef.user.update({"votes": currentUser.votes});

    // update item's always-persisting votes list
    this.state.dbRef.item.child("votes").set(item.value.votes);
 	},

	render: function() {
		var sizes = {
			icon: this.props.dims.width / this.state.widthToIconRatio,
			font: this.props.dims.width / this.state.widthToFontRatio,
		};

		return (
			<View style={styles.container}>
				<TouchableHighlight
					underlayColor="#A4A4A4"
					onPress={() => this._placeVote("up")}>
					<View style={styles.block}>
						<Icon
							name="thumbs-o-up"
							size={sizes.icon}
							color="#40FF00" />
						<Text style={{fontSize: sizes.font, color: "#40FF00"}}>1512</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					underlayColor="transparent"
					onPress={() => this._placeVote("down")}>
					<View style={styles.block}>
						<Icon
							name="thumbs-o-down"
							size={sizes.icon}
							color="#FF0000" />
						<Text style={{fontSize: sizes.font, color: "#FF0000"}}>25</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
});

module.exports = Votes;