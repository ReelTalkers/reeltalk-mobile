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
          index: 0,
        }}
        renderScene={(route, navigator) =>
          <RecommendHome
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
            userId={this.props.userId}
          />
        }
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
