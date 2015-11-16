'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
import Relay from 'react-relay';

import RecommendHome from '../containers/RecommendHome';

class RecommendScreen extends React.Component {
  render() {
    return (
      <RecommendHome
        userId={this.props.userId}
        navigator={this.props.navigator} />
    );
  }
}

export default Relay.createContainer(RecommendScreen, {
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
