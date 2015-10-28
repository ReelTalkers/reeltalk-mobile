'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var Star = React.createClass({

  _selectStar: function(color) {
    return (color === 'gold') ? <Image source={require('image!GoldStar')} /> : <Image source={require('image!GrayStar')} />;
  },

  _onPress: function() {
    this.props.onSelect(this.props.value);
  },

  render: function() {
    return (
        <TouchableHighlight onPress={this._onPress}>
          {this._selectStar(this.props.color)}
        </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
    container: {
    },
});

module.exports = Star;
