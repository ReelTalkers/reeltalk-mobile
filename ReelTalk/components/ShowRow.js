'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var MovieDetailView = require("../containers/MovieDetailView");

var ShowRow = React.createClass({
  showDetails: function(show) {
    this.props.navigator.push({
      title: show.name,
      component: MovieDetailView,
      props: {
        initialShow: show,
        ...this.props,
      },
    });
  },

  render: function() {
    return (
      <TouchableHighlight style={styles.container} onPress={()=>this.showDetails(this.props.show)}>
        <View style={styles.horizontal}>
          <Text>{this.props.rank}</Text>
          <Image
              source={{uri: this.props.show.thumbnail}}
              style={styles.image}
          />
          <View style={styles.displayData}>
            <Text>{this.props.show.name}</Text>
            <Text>Rating: {this.props.show.rating}</Text>
            <Text>Runtime: {this.props.show.runtime}</Text>
            <Text>Average Rating: {this.props.show.averageRating} Stars</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
  },
  displayData: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 100,
    margin: 2,
  },
});

module.exports = ShowRow;
