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

var Votes = React.createClass({
	getInitialState: function() {
		return {
			dbRef: {
				item: this.props.db.child("items/" +this.props.item.id),
				user: this.props.db.child("users/" +this.props.currentUser.key),
			},
			preferredDim: (this.props.dims && this.props.dims.height > this.props.dims.width) ? "height" : "width",
			votes: this.props.item.value.votes,
			widthToFontRatio: 20,
			widthToIconRatio: 20,
		}
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.dims)
			this.setState({
				preferredDim: (nextProps.dims.height > nextProps.dims.width) ? "height" : "width",
			});
	},

	_placeVote: function(voteDirection) {
		var currentUser = this.props.currentUser.value;
		var item = this.props.item;
		var userVoteIndex = -1;

    // previous vote exists
    var oldUserVote = oldUserVote();

    if ( oldUserVote && (oldUserVote.direction != voteDirection) ) {
    	// change votes
      addVoteToItem(voteDirection);
      subtractVoteFromItem(voteDirection);
      updateUserVotes(userVoteIndex, voteDirection);

      this.state.dbRef.user.child("votes/" +userVoteIndex).update(currentUser.votes[userVoteIndex]);
    } else if (!oldUserVote) { // no previous vote -- this is a new vote
      addVoteToItem(voteDirection);
      addToUserVotes(voteDirection);

      if ( _.has(currentUser, "votes") )
    		this.state.dbRef.user.child("votes/" +userVoteIndex).set(currentUser.votes[userVoteIndex]);
    	else
    		this.state.dbRef.user.child.update({"votes": currentUser.votes});
    } else
    	return;

  	this.state.dbRef.item.child("votes").set(item.value.votes);

    // check if previous vote exists
		function oldUserVote() {
			if ( _.has(currentUser, "votes") ) {
				userVoteIndex = _.findIndex(currentUser.votes, function(vote) {
	        return vote.itemId == item.id;
	      });

				return _.findWhere(currentUser.votes, {"itemId": item.id});
			} else
				// add "votes" property to currentUser
				_.extend(currentUser, {"votes": []});
				return undefined;
		}

		function addToUserVotes(direction) {
			var newVote = {
        direction: direction,
        itemId: item.id
      };

    	currentUser.votes.push(newVote);
    	userVoteIndex = currentUser.votes.length - 1;
		}

		function addVoteToItem(direction) {
			/*
				the item's "vote" array will always have "up" &&
				"down" properties
			*/

			item.value.votes[direction]++;
		}

		function subtractVoteFromItem(newDirection) {
			var directionToSubtract = (newDirection == "up") ? "down" : "up";
			item.value.votes[directionToSubtract]--;
		}

		function updateUserVotes(voteIndex, newDirection) {
			currentUser.votes[voteIndex].direction = newDirection;
		}
 	},

 	_getUserVote: function(userVotes, itemId) {
		return _.findWhere(userVotes, {"itemId": itemId});
	},

	render: function() {
		if (!this.props.dims)
			return (<View></View>);

		var sizes = {
			icon: this.props.dims[this.state.preferredDim] / this.state.widthToIconRatio,
			font: this.props.dims[this.state.preferredDim] / this.state.widthToFontRatio,
		};

		var authenticatedUser = this.props.currentUser.value;
		var userVote;

		if ( _.has(authenticatedUser, "votes") )
			userVote = this._getUserVote(this.props.currentUser.value.votes, this.props.item.id);
		
		return (
			<View style={this.props.styles.voteBox}>
				<TouchableHighlight
					underlayColor="#A4A4A4"
					onPress={() => this._placeVote("up")}>
					<View style={this.props.styles.voteBlock}>
						<Icon
							name={(userVote && userVote.direction == "up") ? "thumbs-up" : "thumbs-o-up"}
							size={sizes.icon}
							color="#40FF00" />
						<Text style={{fontSize: sizes.font, color: "#40FF00"}}>
							{this.state.votes.up}
						</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					underlayColor="transparent"
					onPress={() => this._placeVote("down")}>
					<View style={this.props.styles.voteBlock}>
						<Icon
							name={(userVote && userVote.direction == "down") ? "thumbs-down" : "thumbs-o-down"}
							size={sizes.icon}
							color="#FF0000" />
						<Text style={{fontSize: sizes.font, color: "#FF0000"}}>
							{this.state.votes.down}
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
});

module.exports = Votes;