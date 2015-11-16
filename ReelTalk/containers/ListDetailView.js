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

import MovieGrid from "./MovieGrid";
var json = require("../Data");

export default class ListDetailView extends React.Component {

  render() {
    return (
      <View>
        <View style={styles.billboardContainer}>
          <Text>{this.props.list.name}</Text>
          <Text>{this.props.list.followers.length} Followers</Text>
          <Text>Owned by {json.users[this.props.list.owner].name}</Text>
        </View>
        <MovieGrid
          shows={this.props.list["shows"]}
          style={styles.grid}
          navigator={this.props.navigator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
