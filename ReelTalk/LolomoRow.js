'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
} = React;


var LolomoRow = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'http://themeaparty.com/wp-content/uploads/elmo-face.jpg'}}
          style={styles.image}
        />
        <Text> Just Me </Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    image: { width: 100, height: 100 },
});

module.exports = LolomoRow;