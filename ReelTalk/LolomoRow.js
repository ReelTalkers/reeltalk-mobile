'use strict';

var React = require('react-native');
var {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} = React;

var LolomoRow = React.createClass({

  createThumbnail: function(show) {
    return (
      <TouchableHighlight 
        style={styles.movieButton}
        onPress={()=>this.props.onSelect(show)}
      >
        <Image
            source={{uri: show.thumbnail}}
            style={styles.image}
        />
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <View>
        <Text style={styles.categoryName}>{this.props.header}</Text>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={true}>
          {this.props.category.shows.map(show => this.createThumbnail(show))}
          <View style={styles.endOfRow}/>
        </ScrollView>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  categoryName: {
    fontWeight: '600',
    fontSize: 17,
    color: '#929292',
    marginLeft: 5,
  },
  image: {
    width: 115,
    height: 172,
    // TODO: shadows not working right now for some reason
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  movieButton: {
    marginLeft: 5,
  },
  // added just so that we can have padding on the left and right of all movies
  endOfRow: {
    width: 5
  }
});

module.exports = LolomoRow;
