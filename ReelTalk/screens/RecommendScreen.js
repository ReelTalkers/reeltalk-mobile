'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
} = React;

var RecommendHome = require('../containers/RecommendHome');

var RecommendScreen = React.createClass({
  render: function() {
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{
          name: 'Recommend',
          component: RecommendHome,
          props: { userId: this.props.userId }
        }}
        renderScene={(route, navigator) => {
          var props = route.props;
          if (route.component) {
            return React.createElement(route.component, { navigator, ...props })
          }
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'white',
  },
});

module.exports = RecommendScreen;
