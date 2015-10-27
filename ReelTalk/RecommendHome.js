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
var MovieDetailView = require('./MovieDetailView');

var RecommendHome = React.createClass({

  renderDetailView: function() {
    this.props.navigator.push({title: "show",  component: MovieDetailView});
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Billboard/>
        </View>
        <View>
          <Lolomo navigator={this.props.navigator}/>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
  },
  filterContainer: {
    backgroundColor: '#00CC33',
  },
});

module.exports = RecommendHome;
