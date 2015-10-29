'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

var json = require("./Data");
var TopChartsHome = require("./TopChartsHome");

var TopChartsScreen = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Top Charts',
          component: TopChartsHome,
        }}
      />
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
