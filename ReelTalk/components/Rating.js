'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Star from './Star';

export default class Rating extends React.Component {
  constructor() {
    super();
    this.state = {
    	score: 0,
    };
  }

  _changeScore(newScore) {
    this.setState({
      score: newScore,
    });
  }

  _selectStar(index) {
    if (index <= this.state.rating) {
      return 'image!GoldStar';
    }
    else {
      return 'image!GrayStar';
    }
  }

  render() {
    const stars = [1, 2, 3, 4, 5].map((e, i) => (i + 1 <= this.state.score) ? {color: 'gold'} : {color: 'gray'});
    return (
      <View style={styles.container}>
        <Text>Rating:</Text>
        {stars.map((star, i) => <Star color={star.color} value={i + 1} onSelect={this._changeScore}/>)}
        <Text>Average Rating: {this.props.averageRating}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
});
