'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

import Relay from 'react-relay';

import ListsHome from '../containers/ListsHome';

class ListsScreen extends React.Component {
  render() {
    return (
      <ListsHome
        userId={this.props.userId}
        navigator={this.props.navigator} />
    );
  }
}

export default Relay.createContainer(ListsScreen, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        allShows(first: 5) {
          edges {
            node {
              id
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
