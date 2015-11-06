// TODO break into components
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var RatingSlider = React.createClass({
  getInitialState: function() {
  	return {
  		show: this.props.initialShow,
  	};
	},
  // Specifies the type prop must be
  propTypes: {
    style: View.propTypes.style,
  },

  render: function() {
    return (
      <View style={[styles.ratingSlider, this.props.style]}>
        <Text style={styles.sliderText}>{this.props.defaultText}</Text>
      </View>
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
