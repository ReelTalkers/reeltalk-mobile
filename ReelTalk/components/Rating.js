'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var Star = require('./Star');

var Rating = React.createClass({
  getInitialState: function() {
    	return {
    		score: 0,
    	};
  	},

  _changeScore: function(newScore) {
    this.setState({
      score: newScore,
    })
  },

  _get_stars: function(score) {
    return [1, 2, 3, 4, 5].map((e, i) => (i + 1 <= score) ? {color: 'gold'} : {color: 'gray'});
  },

  render: function() {
    var stars = _get_stars(this.state.score);
    return (
      <View style={styles.container}>
        <Text>Rating:</Text>
        {stars.map((star, i) => <Star color={star.color} value={i + 1} onSelect={this._changeScore}/>)}
        <Text>Average Rating: {this.props.averageRating}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
});

module.exports = Rating;
