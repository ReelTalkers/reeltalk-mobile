'use strict';

import React, {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';

class SettingsHome extends React.Component {
  render() {
    return (
      <View>
        <Text>Welcome {this.props.viewer.allUsers.edges[0].node.username}!</Text>
      </View>
    );
  }
}

export default Relay.createContainer(SettingsHome, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        allUsers(first: 1) {
          edges {
            node {
              id
              username
            }
          }
        }
      }
    `
  }
});

const styles = StyleSheet.create({
});
