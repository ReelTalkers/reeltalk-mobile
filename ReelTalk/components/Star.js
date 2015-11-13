'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

export default class Star extends React.Component {

  constructor(props) {
    super(props);
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
