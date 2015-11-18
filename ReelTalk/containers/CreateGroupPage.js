'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Button,
  ListView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var json = require("../Data");
var UserRow = require("../components/UserRow");

var CreateGroupPage = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.users),
      selectedUsers: {},
      text: null,
    };
  },

  handleSelectUser: function(user) {
    console.log("Selecting");
    var updatedSelectedUsers = Object.assign({}, this.state.selectedUsers);
    updatedSelectedUsers[user.id] = user;
    this.setState({
      selectedUsers: updatedSelectedUsers,
    });
  },

  handleDeselectUser: function(user) {
    console.log("Deselecting");
    var updatedSelectedUsers = Object.assign({}, this.state.selectedUsers);
    delete updatedSelectedUsers[user.id];
    this.setState({
      selectedUsers: updatedSelectedUsers,
    });
  },

  renderUserRow: function(user) {
    return (
      <UserRow user={user} onSelectUser={this.handleSelectUser} onDeselectUser={this.handleDeselectUser}/>
    )
  },

  renderHeader: function() {
    return (
      <View style={styles.horizontal}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:10, marginRight:10, marginBottom:10, flex:10}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Group Name"
        />
      <Text onPress={() => this.props.onCreateGroup(this.state.selectedUsers, this.state.text)}> Create </Text>
      </View>
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
  horizontal: {
    flexDirection: "row",
  },
});

module.exports = CreateGroupPage;
