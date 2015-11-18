'use strict';

var React = require('react-native');
var {
  ActionSheetIOS,
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
} = React;

const BUTTONS = [
  'Just Me',
  'Group',
  'None',
  'Cancel',
];
const CANCEL_INDEX = 3;

var Billboard = require('./Billboard');
var CreateGroupPage = require('./CreateGroupPage');
var Lolomo = require('./Lolomo');
var json = require("../Data");

var RecommendHome = React.createClass({
  getInitialState: function() {
    return {
      categories: json.categories,
      groupMembers: [json.users[this.props.userId]],
      filterName: "Just me",
    };
  },

  handleCreateGroup: function(selectedUsers, groupName) {
    if (Object.keys(selectedUsers).length === 0) {
      AlertIOS.alert(
        'No Users Selected',
        'Please select at least one user',
        [
          {text: 'Ok'},
        ]
      )
    }
    else if (groupName === null) {
      AlertIOS.alert(
        'No Group Name',
        'Please name your group',
        [
          {text: 'Ok'},
        ]
      )
    }
    else {
      this.props.navigator.pop();
      this.setState({
        groupMembers: Object.keys(selectedUsers).map(k => selectedUsers[k]),
        filterName: groupName,
      });
      // TODO Filter out and set new movies here
    }
  },

  selectGroup: function() {
    this.props.navigator.push({
      title: "Group",
      component: CreateGroupPage,
      props: {onCreateGroup: this.handleCreateGroup},
    })
  },

  selectMe: function() {
    this.setState({
      groupMembers: [json.users[this.props.userId]],
      filterName: "Just Me",
    });
  },

  showActionSheet: function() {
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
    })
  },

  render: function() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
          <Billboard groupMembers={this.state.groupMembers}
            filterName={this.state.filterName}
            showActionSheet={this.showActionSheet}/>
        </View>
        <Lolomo
          style={styles.lolomo}
          navigator={this.props.navigator}
          userId={this.props.userId}
          categories={this.state.categories}
        />
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
  },
  lolomo: {
    flex: 1,
  },
});

module.exports = RecommendHome;
