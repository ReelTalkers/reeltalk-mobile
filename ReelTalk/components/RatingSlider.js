// TODO break into components
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
} = React;

var RatingSlider = React.createClass({
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          text: evt.nativeEvent.locationX,
          color: "rgb("+evt.nativeEvent.locationX+",255,255)"
        });
      },

      onPanResponderMove: (evt, gestureState) => {
        this.setState({
          text: evt.nativeEvent.locationX,
          color: "rgb("+evt.nativeEvent.locationX+",255,255)"
        });
      },

      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          text: evt.nativeEvent.locationX,
          color: "rgb("+evt.nativeEvent.locationX+",255,255)"
        });
      }
    })
  },

  getInitialState: function() {
  	return {
  		text: this.props.defaultText,
      color: "rgb(255,255,255)"
  	};
	},
  // Specifies the type prop must be
  propTypes: {
    style: View.propTypes.style,
  },

// what if I just had x amount of boxes then justified them and made the color change depending on where you are relative to those boxes/
// then I wouldnt need to worry about what the width size was
  render: function() {
    return (
      <View style={[styles.ratingSlider, this.props.style, {backgroundColor: this.state.color}]} {...this._panResponder.panHandlers}>
        <Text style={styles.sliderText}>{this.state.text}</Text>
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
