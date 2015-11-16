'use strict';

import React, {
  ActionSheetIOS,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var BUTTONS = [
  'Just Me',
  'Group',
  'None',
  'Cancel',
];
var CANCEL_INDEX = 3;

var json = require("../Data");

export default class Billboard extends React.Component {

  constructor() {
    super();
  	this.state = {
  		currentFilter: 'Just Me',
  	};
	}

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if (buttonIndex != CANCEL_INDEX) {
        this.setState({
          currentFilter: BUTTONS[buttonIndex]
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: json.users[this.props.userId].picture}}
          style={styles.image}
        />
        <Text onPress={this.showActionSheet} style={styles.filterSelect}>{this.state.currentFilter}</Text>
        <View style={styles.line} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // center
      height: 190,
    },
    line: {
      marginTop: 10,
      width: 350,
      height: 1,
      backgroundColor: '#F1F1F1'
    },
    filterSelect: {
      color: '#0066FA',
      fontSize: 18,
      marginTop:15,
    },
    image: {
      marginTop: 15,
      width: 125,
      height: 125,
      borderRadius: 125/2,
    },
});
