'use strict';

import React, {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';

class SearchHome extends React.Component {
  render() {
    return (
      <View>
        <Text>Welcome {this.props.viewer.allUserProfiles.edges[0].node.user.firstName}!</Text>
      </View>
    );
  }
}

export default Relay.createContainer(SearchHome, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        allUserProfiles(first: 1) {
          edges {
            node {
              id
              user {
                firstName
              }
            }
          }
        }
      }
    `
  }
});

const styles = StyleSheet.create({
});
