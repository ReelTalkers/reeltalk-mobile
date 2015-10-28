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

  _selectStar: function(index) {
    if (index <= this.state.rating) {
      return 'image!GoldStar';
    }
    else {
      return 'image!GrayStar';
    }
  },

  render: function() {
    var stars = [1, 2, 3, 4, 5].map((e, i) => (i + 1 <= this.state.score) ? {color: 'gold'} : {color: 'gray'});
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
