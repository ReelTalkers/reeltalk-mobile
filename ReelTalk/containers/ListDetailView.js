'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import Relay from 'react-relay';

import MovieGrid from "./MovieGrid";
var json = require("../Data");

class ListDetailView extends React.Component {

  //TODO: Implement followers and actual list model in backend

  render() {
    return (
      <View>
        <View style={styles.billboardContainer}>
          <Text>{this.props.listName}</Text>
          <Text>10 Followers</Text>
          <Text>Owned by Me</Text>
        </View>
        <MovieGrid
          shows={this.props.viewer.list}
          style={styles.grid}
          navigator={this.props.navigator}
        />
      </View>
    );
  }
}

export default Relay.createContainer(ListDetailView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        list: allShows(first: 5) {
          ${MovieGrid.getFragment('shows')}
        }
      }
    `
  }
});

const styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
