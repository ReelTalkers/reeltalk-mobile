// TODO break into components
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var RatingSlider = React.createClass({
  getInitialState: function() {
  	return {
  		text: this.props.defaultText,
  	};
	},
  // Specifies the type prop must be
  propTypes: {
    style: View.propTypes.style,
  },

  _onPressIn: function(evt) {
    this.setState({
      text: evt.nativeEvent.locationX,
    });
  },

// what if I just had x amount of boxes then justified them and made the color change depending on where you are relative to those boxes/
// then I wouldnt need to worry about what the width size was
  render: function() {
    return (
      <TouchableHighlight onPressIn={this._onPressIn}>
        <View style={[styles.ratingSlider, this.props.style]}>
          <Text style={styles.sliderText}>{this.state.text}</Text>
        </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  ratingSlider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderText: {
    fontSize: 17,
    fontWeight: '300'
  },
});

module.exports = RatingSlider;
