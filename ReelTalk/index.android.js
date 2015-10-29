/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var cssVar = require('cssVar');

var ToolbarAndroid = require('ToolbarAndroid');
var ReelTalkNavigator = require('./screens/ReelTalkNavigator');

var ReelTalk = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'recommend',
      userId: '2'
    };
  },

  render: function() {
    return (
      <ReelTalkNavigator
        userId={this.state.userId}
        sceneStyle={styles.scene}
        />
    );
  }
});

var styles = StyleSheet.create({
  scene: {
    paddingTop: 50,
    flex: 1,
  },
});


/*BackAndroid.addEventListener('hardwareBackPress', function() {
     if () {
       this.goBack();
       return true;
     }
     return false;
});*/

AppRegistry.registerComponent('ReelTalk', () => ReelTalk);
