'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

var json = require("../Data");
var TopChartsHome = require("../containers/TopChartsHome");

var TopChartsScreen = React.createClass({
  render: function() {
    return (
      <TopChartsHome
        userId={this.props.userId}
        navigator={this.props.navigator}/>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

module.exports = TopChartsScreen;
