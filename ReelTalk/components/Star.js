'use strict';

import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class Star extends React.Component {

  constructor() {
  super();
 }

  _selectStar(color) {
    return (color === 'gold') ? <Image source={require('image!GoldStar')} /> : <Image source={require('image!GrayStar')} />;
  }

  _onPress() {
    this.props.onSelect(this.props.value);
  }

  render() {
    return (
        <TouchableHighlight onPress={this._onPress}>
          {this._selectStar(this.props.color)}
        </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
    container: {
    },
});
module.exports = Star;
