'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

import RecommendHome from '../containers/RecommendHome';

var RecommendScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.screen}>
        <RecommendHome
          userId={this.props.userId}
          navigator={this.props.navigator}
          />
      </View>
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
  screen: {
    flex: 1,
    paddingTop: 64
  }
});

module.exports = RecommendScreen;
