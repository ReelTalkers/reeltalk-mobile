'use strict';

import React, {
  ActionSheetIOS,
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import Relay from 'react-relay';

import Billboard from './Billboard';
import Lolomo from './Lolomo';
import CreateGroupPage from './CreateGroupPage';

import { getRootQueryConfig } from '../../queryConfigs';

const BUTTONS = [
  'Just Me',
  'Group',
  'None',
  'Cancel',
];
const CANCEL_INDEX = 3;

class RecommendHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupMembers: [props.user],
      filterName: 'Just me'
    }
  }

  handleCreateGroup(selectedUsers, groupName) {
    if (Object.keys(selectedUsers).length === 0) {
      AlertIOS.alert(
        'No Users Selected',
        'Please select at least one user',
        [
          {text: 'Ok'},
        ]
      )
    } else {
      this.props.changeTransparency(false);
      this.props.navigator.pop();
      this.setState({
        // TODO: Billy, why not just set equal to selectedUsers?
        groupMembers: Object.keys(selectedUsers).map(k => selectedUsers[k]),
        filterName: groupName,
      });
      // TODO Filter out and set new movies here
    }
  }

  selectGroup() {
    this.props.changeTransparency(true);
    this.props.navigator.push({
      title: "Group",
      Component: CreateGroupPage,
      queryConfig: getRootQueryConfig(),
      props: {
        onCreateGroup: (selectedUsers, groupName) => this.handleCreateGroup(selectedUsers, groupName)
      },
    });
  }

  selectMe() {
    this.setState({
      groupMembers: [this.props.user],
      filterName: "Just Me",
    });
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if (buttonIndex != CANCEL_INDEX) {
        this.setState({
          currentFilter: BUTTONS[buttonIndex]
        });
      }
      if (buttonIndex === 0) {
        this.selectMe();
      }
      if (buttonIndex === 1) {
        this.selectGroup();
      }
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
          <Billboard
            user={this.props.user}
            groupMembers={this.state.groupMembers}
            filterName={this.state.filterName}
            showActionSheet={() => this.showActionSheet()}
            />
        </View>
        <Lolomo
          style={styles.lolomo}
          userIds={this.state.groupMembers.map(obj => obj.__dataID__)}
          viewer={this.props.viewer}
          navigator={this.props.navigator}
          categories={this.state.categories}
          changeTransparency={this.props.changeTransparency}
        />
      </ScrollView>
    );
  }
}

export default Relay.createContainer(RecommendHome, {
  fragments: {
    user: () => Relay.QL`
      fragment on UserProfile {
        picture
        ${Billboard.getFragment('user')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on Query {
        ${Lolomo.getFragment('viewer')}
      }
    `
  }
});

const styles = StyleSheet.create({
  // TODO: un-hard code
  scrollView: {
    marginBottom: 50,
  },
  billboardContainer: {
    marginBottom: 10,
  },
  lolomo: {
    flex: 1,
  },
});
