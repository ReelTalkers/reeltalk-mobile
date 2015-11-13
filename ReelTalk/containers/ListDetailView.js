'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  View,
} = React;

var MovieGrid = require("./MovieGrid");
var json = require("../Data");

var ListDetailView = React.createClass({

  render: function() {
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
  },
});

var styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = ListDetailView;
