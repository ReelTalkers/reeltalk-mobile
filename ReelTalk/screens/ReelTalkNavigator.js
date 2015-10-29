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

var ReelTalkNavigator = React.createClass({
  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          title: 'Recommend',
          component: RecommendHome,
          props: { userId: this.props.userId }
        }}
        navigationBar={this.props.navigationBar}
        renderScene={(route, navigator) => {
          var props = route.props;
          if (route.component) {
            return React.createElement(route.component, { navigator, ...props })
          }
        }}
        sceneStyle={this.props.sceneStyle}
        onBack={() => {
          if (route.title !== 'Recommend') {
            navigator.pop();
          }
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#dddddd',
    flex: 1,
  },
});


module.exports = ReelTalkNavigator;
