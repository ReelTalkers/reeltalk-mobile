'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Billboard = require('./Billboard');
var Lolomo = require('./Lolomo');

var RecommendHome = React.createClass({
  render: function() {
    return (
      <View>
        <Billboard
          userId={this.props.userId}
        />
        <Lolomo
          style={styles.lolomo}
          navigator={this.props.navigator}
          userId={this.props.userId}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  lolomo: {
    flex: 1,
  },
});

module.exports = RecommendHome;
