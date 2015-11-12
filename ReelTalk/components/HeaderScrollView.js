'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    ScrollView,
    Animated
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
                            inputRange: [-windowHeight, 0, windowHeight],
                            outputRange: [windowHeight, 0, -windowHeight/3]
                        })
                    }]
                }]}
                source={backgroundSource}
            />
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
                height: windowHeight,
                backgroundColor: 'black',
                opacity: scrollY.interpolate({
                    inputRange: [-windowHeight, 0, windowHeight * 1.2],
                    outputRange: [0, 0, 1]
                }),
            }}>
                {this.props.header}
            </Animated.View>
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
                    )}>
                    {this.renderHeader()}
                    <View style={styles.content}>
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
    content: {
        flex: 1,
        flexDirection: 'column'
    }
});

module.exports = HeaderScrollView;
