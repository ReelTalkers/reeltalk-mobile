'use strict';

import React, {
  ActionSheetIOS,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';

var BUTTONS = [
  'Just Me',
  'Group',
  'None',
  'Cancel',
];
var CANCEL_INDEX = 3;

class Billboard extends React.Component {

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
          source={{uri: this.props.user.picture}}
          style={styles.image}
        />
        <Text onPress={this.showActionSheet} style={styles.filterSelect}>{this.state.currentFilter}</Text>
        <View style={styles.line} />
      </View>
    );
  }
}

export default Relay.createContainer(Billboard, {
  fragments: {
    user: () => Relay.QL`
      fragment on UserProfile {
        picture
      }
    `
  }
});

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
