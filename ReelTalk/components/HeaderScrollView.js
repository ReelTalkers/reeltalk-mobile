'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    ScrollView,
    Image,
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

    renderBackground: function (windowHeight, backgroundSource) {
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Image
                style={[styles.background, {
                    height: windowHeight,
                }]}
                source={backgroundSource}>
            </Image>
        );
    },

    render: function () {
        var { style, ...props } = this.props;
        return (
            <ScrollView
                ref={component => { this._scrollView = component; }}
                {...props}
                style={[style, styles.scrollView]}
                stickyHeaderIndices={[0]}>
                {this.renderBackground(windowHeight, backgroundSource)}
                <View>
                    {this.props.children}
                </View>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    background: {
        width: screen.width,
    }
});

module.exports = HeaderScrollView;
