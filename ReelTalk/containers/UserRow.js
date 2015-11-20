'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Relay from 'react-relay';

class UserRow extends React.Component {

  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  render() {
    const { userProfile, onSelectUser, onDeselectUser } = this.props;
    console.log(userProfile)
    return (
      <TouchableHighlight
        onPress={ () => {
          this.state.selected ? onDeselectUser(userProfile) : onSelectUser(userProfile);
          this.setState({
            selected: !this.state.selected,
          })
        }}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image
              source={{uri: userProfile.picture}}
              style={styles.image}
            />
            {/* TODO: ask Greg how to get username*/}
            <Text style={[styles.humanName, this.state.selected && styles.selectedFont]}>{userProfile.user.firstName + ' ' + userProfile.user.lastName}</Text>
            <View style={[styles.checkBox, this.state.selected && styles.selectedCheckBox]}/>
          </View>
          <View style={styles.rowDivider}/>
        </View>
      </TouchableHighlight>
    );
  }
}

export default Relay.createContainer(UserRow, {
  fragments: {
    userProfile: () => Relay.QL`
      fragment on UserProfile {
        id
        picture
        user {
          firstName
          lastName
        }
      }
    `
  }
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 30/2,
  },
  humanName: {
    fontSize: 15,
  },
  selectedFont: {
    color: '#4090DB'
  },
  checkBox: {
    position: 'absolute',
    right: 10,
    height: 30,
    width: 30,
    borderRadius: 30/ 2,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
    borderWidth: 2,
  },
  selectedCheckBox: {
    backgroundColor: '#3DAF2C',
    borderWidth: 0,
  },
  rowDivider: {
    height: 1,
    marginLeft: 50,
    marginRight: 10,
    backgroundColor: '#E6E6E6'
  },
});
