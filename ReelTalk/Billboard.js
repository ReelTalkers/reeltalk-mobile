'use strict';

var React = require('react-native');
var {
  ActionSheetIOS,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var BUTTONS = [
  'Just Me',
  'Group',
  'None',
  'Cancel',
];
var CANCEL_INDEX = 3;

var json = require("./Data");

var Billboard = React.createClass({

  getInitialState: function() {
  	return {
  		currentFilter: 'Just Me',
  	};
	},

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      this.setState({ currentFilter: BUTTONS[buttonIndex] });
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: json.users[this.props.userId].picture}}
          style={styles.image}
        />
      <Text onPress={this.showActionSheet}>{this.state.currentFilter}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // center
      height: 190,
    },
    image: {
      width: 100,
      height: 100
    },
});

module.exports = Billboard;
