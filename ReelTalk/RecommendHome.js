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
      <View style={styles.container}>
        <Lolomo 
          userId = {this.props.userId}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
  },
});

module.exports = RecommendHome;
