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
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Billboard/>
        </View>
        <View style={styles.recommendationsContainer}>
          <Lolomo/>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 65,
  },
  filterContainer: {
    flex: 1,
    backgroundColor: '#00CC33',
  },
  recommendationsContainer: {
    flex: 4,
    backgroundColor: '#CC3333',
  },
  big: {
    fontSize: 100,
  },
});

module.exports = RecommendHome;