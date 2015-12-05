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

  handleSelectUser(user, updatedSelectedUsers) {
    updatedSelectedUsers[user.id] = user;
    this.setState({
      selectedUsers: updatedSelectedUsers,
    });
  }

  handleDeselectUser(user, updatedSelectedUsers) {
    delete updatedSelectedUsers[user.id];
    this.setState({
      selectedUsers: updatedSelectedUsers,
    });
  }

  renderUserRow(userProfile) {
    return (
      <UserRow
        userProfile={userProfile}
        onSelectUser={(user) => this.handleSelectUser(user, Object.assign({}, this.state.selectedUsers))}
        onDeselectUser={(user) => this.handleDeselectUser(user, Object.assign({}, this.state.selectedUsers))} />
    )
  }

  renderHeader() {
    const selectedUsers = this.state.selectedUsers;
    const userFirstNames = Object.keys(selectedUsers).map(k => selectedUsers[k].user.firstName).join(", ");
    return (
      <TouchableHighlight onPress={() => this.props.onCreateGroup(this.state.selectedUsers, userFirstNames)}>
        <View style={styles.createButton}>
          <Text style={styles.createText}>
             Create
          </Text>
        </View>
      </TouchableHighlight>
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
  createButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderColor: '#E6E6E6',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createText: {
    fontSize: 17,
    color: '#0066FA',
  }
});
