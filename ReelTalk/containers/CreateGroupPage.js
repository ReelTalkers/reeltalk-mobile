'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Button,
  ListView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Relay from 'react-relay';

import UserRow from "./UserRow";

class CreateGroupPage extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const users = props.viewer.users.edges.map(edge => edge.node);
    this.state = {
      dataSource: ds.cloneWithRows(users),
      selectedUsers: {},
      text: null,
    };
  }

  handleSelectUser(user) {
    var updatedSelectedUsers = Object.assign({}, this.state.selectedUsers);
    updatedSelectedUsers[user.id] = user;
    this.setState({
      selectedUsers: updatedSelectedUsers,
    });
  }

  handleDeselectUser(user) {
    var updatedSelectedUsers = Object.assign({}, this.state.selectedUsers);
    delete updatedSelectedUsers[user.id];
    this.setState({
      selectedUsers: updatedSelectedUsers,
    });
  }

  renderUserRow(userProfile) {
    return (
      <UserRow
        userProfile={userProfile}
        onSelectUser={(user) => this.handleSelectUser(user)}
        onDeselectUser={(user) => this.handleDeselectUser(user)} />
    )
  }

  renderHeader() {
    return (
      <View style={styles.horizontal}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:10, marginRight:10, marginBottom:10, flex:10}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Group Name"
        />
        <Text
          onPress={() => this.props.onCreateGroup(this.state.selectedUsers, this.state.text)}>
           Create
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => this.renderHeader()}
        renderRow={(userProfile) => this.renderUserRow(userProfile)}
        style={styles.listView}
        showsVerticalScrollIndicator={true}
      />
    );
  }
}

export default Relay.createContainer(CreateGroupPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        users: allUserProfiles(first: 10) {
          edges {
            node {
              ${UserRow.getFragment('userProfile')}
            }
          }
        }
      }
    `
  }
})

const styles = StyleSheet.create({
  listView: {
     backgroundColor: 'white',
  },
  horizontal: {
    flexDirection: "row",
  },
});
