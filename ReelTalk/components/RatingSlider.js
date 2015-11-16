// TODO break into components
'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class RatingSlider extends React.Component {
  constructor(props) {
    super(props);
  	this.state = {
  		text: this.props.defaultText,
      bucketWidth: null,
      // TODO: change to transparentish
      color: "#BAB7AE",
  	};
	}

  // TODO: is it bad style to change the states around? Are they supposed to be static?
  _setBucketWidth(bucketWidth) {
    this.setState({
      text: this.state.text,
      bucketWidth: bucketWidth,
      color: this.state.color,
    });
  }

  // Specifies the type prop must be
  propTypes: {
    style: View.propTypes.style,
  }

  // TODO: is there a way to do it without storing width in the state?
  _onLayout(evt) {
    var numOptions = this.props.options.length;
    var width = evt.nativeEvent.layout.width;

    var bucketWidth = width / numOptions;
    this._setBucketWidth(bucketWidth);
  }

  _alterRating(x) {
    // We take the floor since index starts at 0
    var bucketIndex = Math.floor(x / this.state.bucketWidth);
    var option = this.props.options[bucketIndex];

    // We dont have a method to do this since changing the state triggers
    //  re-rendering and we dont want to render twice
    this.setState({
      text: option.text,
      bucketWidth: this.state.bucketWidth,
      color: option.color,
    });
  }

  componentWillMount() {
    this._responder = {
      onStartShouldSetResponder: (evt) => true,
      onMoveShouldSetResponder: (evt) => true,
      // TODO: not sure that the following two are necessary
      onStartShouldSetResponderCapture: (evt) => true,
      onMoveShouldSetResponderCapture: (evt) => true,
      // allows the gesture to continue even if accidentally scrolled
      onResponderTerminationRequest: (evt) => false,

      // TODO: not crazy that we are using pageX, then it will only work well for full page width
      //       but necessary to avoid touching the text messing things up
      onResponderGrant: (evt) => {
        this._alterRating(evt.nativeEvent.pageX);
        this.props.disableScroll && this.props.disableScroll();
      },

      onResponderMove: (evt) => {
        this._alterRating(evt.nativeEvent.pageX);
      },

      onResponderRelease: (evt) => {
        this.props.enableScroll && this.props.enableScroll();
        // TODO: send the final rating to the db
      },

    };
  }

  render() {
    return (
      <View style={[styles.ratingSlider, this.props.style, {backgroundColor: this.state.color}]}
            onLayout={this._onLayout}
            {...this._responder}
      >
        <Text style={styles.sliderText}>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingSlider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderText: {
    fontSize: 17,
    fontWeight: '300'
  },
});
