'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

var json = require("../Data");

var CreateGroupPage = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.users),
    };
  },

  renderUserRow: function(category) {
    return (
      <Text> Hello </Text>
    )
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderUserRow}
        style={styles.listView}
        showsVerticalScrollIndicator={true}
      />
    );
  },
});

var styles = StyleSheet.create({
  listView: {
     backgroundColor: 'white',
  },
});

module.exports = CreateGroupPage;
