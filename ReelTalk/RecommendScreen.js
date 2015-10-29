'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
} = React;

var RecommendHome = require('./RecommendHome');

var RecommendScreen = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Recommend',
          component: RecommendHome,
          rightButtonIcon: require('image!SearchButton'),
          passProps: {
            userId: this.props.userId
          },
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

module.exports = RecommendScreen;
