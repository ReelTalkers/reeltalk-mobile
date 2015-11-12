'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

import ListsHome from '../containers/ListsHome';

var ListsScreen = React.createClass({
  render: function() {
    return (
      <ListsHome
        userId={this.props.userId}
        navigator={this.props.navigator} />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = ListsScreen;
