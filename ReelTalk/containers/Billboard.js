'use strict';

var React = require('react-native');
var {
  ActionSheetIOS,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var json = require("../Data");

var Billboard = React.createClass({

  getInitialState: function() {
  	return {
  		currentFilter: 'Just Me',
      userId: this.props.userId,
  	};
	},

  generateGroupImage: function() {
    return ({uri: this.props.groupMembers[0].picture});
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Image
          source={this.generateGroupImage()}
          style={styles.image}
        />
      <Text onPress={this.props.showActionSheet} style={styles.filterSelect}>{this.state.currentFilter}</Text>
        <View style={styles.line} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // center
      height: 190,
    },
    line: {
      marginTop: 10,
      width: 350,
      height: 1,
      backgroundColor: '#F1F1F1'
    },
    filterSelect: {
      color: '#0066FA',
      fontSize: 18,
      marginTop:15,
    },
    image: {
      marginTop: 15,
      width: 125,
      height: 125,
      borderRadius: 125/2,
    },
});

module.exports = Billboard;
