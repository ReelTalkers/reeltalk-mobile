'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
} = React;


var LolomoRow = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text>{this.props.category.name}</Text>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            style={[styles.scrollView,]}>
            {this.props.category.shows.map(createThumbnail)}
          </ScrollView>
      </View>
    );
  },
});

var createThumbnail = (show) => <Image
  source={{uri: show.thumbnail}}
  style={styles.image}
/>;

var styles = StyleSheet.create({
    container: {
      backgroundColor: 'blue',
      height: 100,
    },
    scrollView: {
    backgroundColor: 'green',
    height: 300,
    width:200,
  },
  image: {
    width: 100,
    height: 100
  },
});

module.exports = LolomoRow;
