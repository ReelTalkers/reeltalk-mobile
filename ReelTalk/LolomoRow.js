'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
} = React;


var LolomoRow = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text>{this.props.show.name}</Text>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            style={[styles.scrollView,]}>
            <Text>HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello</Text>
          </ScrollView>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      backgroundColor: 'blue',
      height: 100,
    },
    scrollView: {
    backgroundColor: 'green',
    height: 300,
    width:200,
  },
});

module.exports = LolomoRow;
