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

var MovieDetailView = require('./MovieDetailView');

var LolomoRow = React.createClass({

  showDetails: function(show) {
    this.props.navigator.push({title: show.name,  component: MovieDetailView});
  },

  createThumbnail: function(show) {
    return (
      <TouchableHighlight onPress={()=>this.showDetails(show)}>
        <View>
          <Image
              source={{uri: show.thumbnail}}
              style={styles.image}
          />
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <View>
        <Text>{this.props.category.name}</Text>
        <View style={styles.rowContainer}>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={true}>
            {this.props.category.shows.map(show => this.createThumbnail(show))}
          </ScrollView>
        </View>
      </View>
    );
  },
});

// var displayDetailView = (show) =>
//   this.props.navigator.push({title: "show",  component: MovieDetailView});
//
// // var createThumbnail = (show) =>
//   <TouchableHighlight style={styles.wrapper} onPress={displayDetailView(show)}>
//     <View>
//     <Image
//         source={{uri: show.thumbnail}}
//         style={styles.image}
//     />
// </View>
//   </TouchableHighlight>

var styles = StyleSheet.create({
  image: {
    width: 140,
    height: 200,
    margin: 2,
  },
});

module.exports = LolomoRow;
