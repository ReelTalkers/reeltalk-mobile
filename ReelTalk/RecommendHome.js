'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Lolomo = require('./Lolomo');

var RecommendHome = React.createClass({
  render: function() {
    return (
      <Lolomo style={styles.lolomo}
        userId = {this.props.userId}
      />
    );
  },
});

var styles = StyleSheet.create({
  lolomo: {
    flex: 1,
  },
});

module.exports = RecommendHome;
