'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default class Star extends React.Component {

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

const styles = StyleSheet.create({
    container: {
    },
});
