'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    ScrollView,
    Animated,
    } = React;

var ScrollableMixin = require('react-native-scrollable-mixin');
var screen = require('Dimensions').get('window');
var ScrollViewPropTypes = ScrollView.propTypes;

var HeaderScrollView = React.createClass({
    mixins: [ScrollableMixin],

    propTypes: {
        ...ScrollViewPropTypes,
        windowHeight: React.PropTypes.number,
        backgroundSource: React.PropTypes.object,
        header: React.PropTypes.node,
    },

    getDefaultProps: function () {
        return {
            windowHeight: 300,
        };
    },

    getInitialState: function () {
        return {
            scrollY: new Animated.Value(0)
        };
    },

    /**
     * IMPORTANT: You must return the scroll responder of the underlying
     * scrollable component from getScrollResponder() when using ScrollableMixin.
     */
    getScrollResponder() {
      return this._scrollView.getScrollResponder();
    },

    setNativeProps(props) {
      this._scrollView.setNativeProps(props);
    },

    renderBackground: function () {
        var { windowHeight, backgroundSource } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.Image
                style={[styles.background, {
                    height: windowHeight,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [ -windowHeight, 0, windowHeight],
                            outputRange: [0, 0, -windowHeight/3]
                        })
                    }]
                }]}
                source={backgroundSource}>
            </Animated.Image>
        );
    },

    renderHeader: function () {
        var { windowHeight, backgroundSource } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.View style={{
                position: 'relative',
                height: scrollY.interpolate({
                  inputRange: [-1, 0],
                  outputRange: [windowHeight-1, windowHeight]
                }),
                opacity: scrollY.interpolate({
                    inputRange: [-windowHeight, 0, windowHeight / 1.2],
                    outputRange: [1, 1, 0]
                }),
            }}>
                {this.props.header}
            </Animated.View>
        );
    },

    renderDivider: function () {
      var { scrollY } = this.state;
      return (
        <View>
          <View style={[styles.dividerLine, {background: this.props.dividerColor}]} />
          <Animated.View style={{
              backgroundColor: "transparent",
              flex: 1,
              height: scrollY.interpolate({
                inputRange: [-1,0,1],
                outputRange: [1,0,0]
              })
            }}/>
        </View>
      );
    },

    render: function () {
        var { style, ...props } = this.props;
        return (
            <View style={[styles.container, style]}>
                {this.renderBackground()}
                <ScrollView
                    ref={component => { this._scrollView = component; }}
                    {...props}
                    style={styles.scrollView}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: this.state.scrollY }}}]
                    )}
                    scrollEventThrottle={16}>
                    {this.renderHeader()}
                    <View style={styles.content}>
                        {this.renderDivider()}
                        {this.props.children}
                    </View>
                </ScrollView>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        backgroundColor: '#2e2f31',
        width: screen.width,
        resizeMode: 'cover'
    },
    dividerLine: {
      height: 3,
    },
    content: {
        // shadowColor: '#222',
        // shadowOpacity: 0.3,
        // shadowRadius: 2,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});

module.exports = HeaderScrollView;
