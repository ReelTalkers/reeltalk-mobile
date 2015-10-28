'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var Star = React.createClass({

  _selectStar: function(color) {
    return (color === 'gold') ? <Image source={require('image!GoldStar')} /> : <Image source={require('image!GrayStar')} />;
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this._selectStar(this.props.color)}
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
    },
});

module.exports = Star;
