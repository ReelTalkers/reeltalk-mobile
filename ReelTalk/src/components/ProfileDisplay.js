'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ProfileDisplay extends React.Component {
  render() {
    const name = this.props.name ? <Text style={styles.filterSelect}>{this.props.name}</Text> : <View/>
    return (
      <View style={styles.billboardContainer}>
        <Image
          source={{uri: this.props.picture}}
          style={styles.circularImage}
        />
        {name}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularImage: {
    marginTop: 15,
    width: 125,
    height: 125,
    borderRadius: 125/2,
  },
  filterSelect: {
    color: '#0066FA',
    fontSize: 18,
    marginTop:15,
  },
});
