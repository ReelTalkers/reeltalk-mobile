'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;


var MovieDetailView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
         <Text>Details</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
});

module.exports = MovieDetailView;
