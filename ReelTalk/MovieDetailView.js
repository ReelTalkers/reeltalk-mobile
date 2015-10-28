'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;


var MovieDetailView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.movieInfo}>
          <Image
              source={{uri: this.props.show.thumbnail}}
              style={styles.image}
          />
          <View style={styles.metadata}>
            <Text>Name: {this.props.show.name}</Text>
            <Text>Year: {this.props.show.year}</Text>
            <Text>Runtime: {this.props.show.runtime}</Text>
            <Text>Rating: {this.props.show.rating}</Text>
            <Text>Genre: {this.props.show.genre}</Text>
            <Text>Director: {this.props.show.director}</Text>
            <Text style={styles.actors}>Actors</Text>
            {this.props.show.actors.map(actor => <Text>{actor}</Text>)}
          </View>
        </View>
        <Text>Description: {this.props.show.description}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      marginTop: 65,
    },
    movieInfo: {
      flexDirection: 'row',
    },
    actors: {
      textDecorationLine: 'underline',
    },
    metadata: {
      flexDirection: 'column',
    },
    image: {
      width: 140,
      height: 200,
      margin: 2,
    },
});

module.exports = MovieDetailView;
