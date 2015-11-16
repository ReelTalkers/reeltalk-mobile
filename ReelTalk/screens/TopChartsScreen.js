'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View,
} = React;
import Relay from 'react-relay';

var json = require("../Data");
var TopChartsHome = require("../containers/TopChartsHome");

class TopChartsScreen extends React.Component {
  render() {
    return (
      <TopChartsHome
        userId={this.props.userId}
        navigator={this.props.navigator}/>
    );
  }
}

export default Relay.createContainer(TopChartsScreen, {
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
    backgroundColor: 'white',
  },
});
