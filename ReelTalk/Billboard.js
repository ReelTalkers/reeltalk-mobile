'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var json = require("./Data");

var Billboard = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: json.users[this.props.userId].picture}}
          style={styles.image}
        />
        <Text> Just Me </Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // center
      height: 190,
    },
    image: {
      width: 100,
      height: 100
    },
});

module.exports = Billboard;
