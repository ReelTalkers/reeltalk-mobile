'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} = React;

var Rating = require('./Rating');
var LolomoRow = require('./LolomoRow');
var json = require("./Data");

var MovieDetailView = React.createClass({
  getInitialState: function() {
  	return {
  		show: this.props.initialShow,
  	};
	},

  _changeShow: function(newShow) {
    this.setState({
      show: newShow,
    });
  },

  render: function() {
    return (
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={false}
      >
        <Image
            source={{uri: this.state.show.largePoster}}
            style={styles.largeImage}
        />
        <View style={styles.metadata}>
          <Text>Name: {this.state.show.name}</Text>
          <Text>Year: {this.state.show.year}</Text>
          <Text>Runtime: {this.state.show.runtime}</Text>
          <Text>Rating: {this.state.show.rating}</Text>
          <Text>Genre: {this.state.show.genre}</Text>
          <Text>Director: {this.state.show.director}</Text>
          <Text style={styles.actors}>Actors</Text>
          {this.state.show.actors.map(actor => <Text>{actor}</Text>)}
        </View>
        <Text>Description: {this.state.show.description}</Text>
        <Rating averageRating={this.state.show.averageRating}/>
        <Text>Viewers also Enjoyed</Text>
        <LolomoRow header={"Others also enjoyed:"} category={json.categories[0]} onSelect={this._changeShow}/>

      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    actors: {
      textDecorationLine: 'underline',
    },
    metadata: {
      flexDirection: 'column',
    },
    largeImage: {
      flex: 1,
      width: 375,
      height: 600,
    },
});

module.exports = MovieDetailView;
