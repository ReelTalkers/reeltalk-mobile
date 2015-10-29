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
  DrawerLayoutAndroid
} = React;

var ToolbarAndroid = require('ToolbarAndroid');

var ReelTalk = React.createClass({
  _onActionSelected: function() {

  },

  render: function() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
          I'm in the drawer!
        </Text>
      </View>
    )
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        renderNavigationView={() => navigationView}>
        <ToolbarAndroid
          title="ReelTalk"
          actions={[]}
          onActionSelected={this.onActionSelected}
          style={styles.toolbar} />
        <View><Text>Hello</Text></View>
      </DrawerLayoutAndroid>
    );
  }
});

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'cyan',
    height: 56,
  },
});

AppRegistry.registerComponent('ReelTalk', () => ReelTalk);
