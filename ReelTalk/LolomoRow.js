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
        <View style={styles.rowContainer}>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={true}>
            {this.props.category.shows.map(createThumbnail)}
          </ScrollView>
        </View>
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
  },
  image: {
    width: 140,
    height: 200
  },
});

module.exports = LolomoRow;
