'use strict';

import React, {
  ActionSheetIOS,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
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

import Avatar from "../components/Avatar";

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

  generateGroupImage() {
    return ({uri: this.props.user.picture});
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.props.showActionSheet} activeOpacity={1}>
          <View style={styles.container}>
            <Avatar groupMembers={this.props.groupMembers}/>
            <Text  style={styles.filterSelect}>{this.props.filterName}</Text>
          </View>
        </TouchableHighlight>
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
