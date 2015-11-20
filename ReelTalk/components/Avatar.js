'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class Avatar extends React.Component {

  // given an id returns an image object of the groupMember at that location
  _getImage(id) {
    return (
      <Image
          source={{uri: this.props.groupMembers[id].picture}}
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
            {this._getImage(0)}
            {this._getImage(1)}
          </View>
        </View>
      );
    }
    else if (this.props.groupMembers.length === 3) {
      return (
        <View style={styles.circle}>
          <View style={styles.squareRow}>
          <View style={styles.squareColumn}>
            {this._getImage(0)}
          </View>
          <View style={styles.squareColumn}>
            {this._getImage(1)}
            {this._getImage(2)}
          </View>
        </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.circle}>
          <View style={styles.squareRow}>
            {this._getImage(0)}
            {this._getImage(1)}
          </View>
          <View style={styles.squareRow}>
            {this._getImage(2)}
            {this._getImage(3)}
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
