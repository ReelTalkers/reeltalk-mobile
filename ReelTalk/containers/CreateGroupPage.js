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
    };
  },

  renderUserRow: function(user) {
    return (
      <UserRow user={user}/>
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
    keyboardType="numeric"
  />
<Text onPress={this.props.onCreateGroup}> Create </Text>
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
