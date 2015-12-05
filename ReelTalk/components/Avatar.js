'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class Avatar extends React.Component {

  // given an id returns an image object of the groupMember at that location
  _getImage(profileURI) {
    return (
      <Image
          source={{uri: profileURI}}
          style={styles.image}
      />
  );
  }

  render() {
    if (this.props.groupMembers.length === 1) {
      return (
          <Image
            source={{uri: this.props.groupMembers[0].picture}}
            style={styles.circle}
          />
      );
    }
    else if (this.props.groupMembers.length === 2) {
      return (
        <View style={styles.circle}>
          <View style={styles.squareRow}>
            {this._getImage(this.props.groupMembers[0].picture)}
            {this._getImage(this.props.groupMembers[1].picture)}
          </View>
        </View>
      );
    }
    else if (this.props.groupMembers.length === 3) {
      return (
        <View style={styles.circle}>
          <View style={styles.squareRow}>
          <View style={styles.squareColumn}>
            {this._getImage(this.props.groupMembers[0].picture)}
          </View>
          <View style={styles.squareColumn}>
            {this._getImage(this.props.groupMembers[1].picture)}
            {this._getImage(this.props.groupMembers[2].picture)}
          </View>
        </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.circle}>
          <View style={styles.squareRow}>
            {this._getImage(this.props.groupMembers[0].picture)}
            {this._getImage(this.props.groupMembers[1].picture)}
          </View>
          <View style={styles.squareRow}>
            {this._getImage(this.props.groupMembers[2].picture)}
            {this._getImage(this.props.groupMembers[3].picture)}
          </View>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  circle: {
    marginTop: 15,
    width: 125,
    height: 125,
    flexDirection: 'column',
    borderRadius:125/2,
  },
  squareRow: {
    flexDirection: 'row',
    flex: 1,
  },
  squareColumn: {
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
