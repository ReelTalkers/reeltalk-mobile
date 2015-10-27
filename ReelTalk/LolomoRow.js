'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
} = React;


var LolomoRow = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text>{this.props.show.name}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    image: { width: 100, height: 100 },
});

module.exports = LolomoRow;
