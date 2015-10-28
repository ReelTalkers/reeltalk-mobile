'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var ShowRow = React.createClass({
  render: function() {
    return (
      <Text>{this.props.show.name}</Text>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: 'white',
  },
});

module.exports = ShowRow;
