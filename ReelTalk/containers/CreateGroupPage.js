'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
} = React;

var json = require("../Data");
var UserRow = require("../components/UserRow");

var CreateGroupPage = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.users),
    };
  },

  renderUserRow: function(user) {
    return (
      <UserRow user={user}/>
    )
  },

  renderHeader: function() {
    return (
      <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:10, marginRight:10, marginBottom:10}}
    onChangeText={(text) => this.setState({text})}
    value={this.state.text}
    placeholder="Group Name"
    keyboardType="numeric"
  />
    );
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
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
