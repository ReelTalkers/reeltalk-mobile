'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

import Relay from 'react-relay';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.viewer.allShows.edges.map(edge => (
          <Text>{edge.node.title}</Text>
        ))}
      </View>
    );
  }
}

export default Relay.createContainer(SettingsScreen, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        allShows(first: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
