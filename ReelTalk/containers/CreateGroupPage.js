'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Button,
  ListView,
  Text,
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
    const selectedUsers = this.state.selectedUsers;
    const userFirstNames = Object.keys(selectedUsers).map(k => selectedUsers[k].user.firstName+" ")
    return (
      <Text
        onPress={() => this.props.onCreateGroup(this.state.selectedUsers, userFirstNames)}>
         Create
      </Text>
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
});
