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
      <TouchableHighlight style={styles.container} onPress={()=>{
          this.state.selected ? onDeselectUser(userProfile) : onSelectUser(userProfile);
          this.setState({
            selected: !this.state.selected,
          })
        }}>
      <View style={{
          backgroundColor: this.state.selected ? 'green' : 'white'
        }}>
        <View style={styles.horizontal}>
          <Image
              source={{uri: userProfile.picture}}
              style={styles.image}
          />
          <View style={styles.displayData}>
              <Text>{userProfile.user.firstName + ' ' + userProfile.user.lastName}</Text>
          </View>
        </View>
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
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
  },
  displayData: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: 10,
    borderRadius: 70/2,
  },
});
