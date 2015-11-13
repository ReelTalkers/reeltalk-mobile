'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ListView,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
} = React;

var json = require("../Data");
var MovieGrid = require("./MovieGrid");

var TopChartsHome = React.createClass({
  getInitialState: function() {
    return {
      shows: json.categories[0].shows,
    };
  },

  _onValueChange(value) {
    const newList = (value === 'Today') ? json.categories[0].shows : json.categories[2].shows;
    this.setState({
      shows: newList,
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <SegmentedControlIOS
          values={["This Week", "Today"]}
          selectedIndex={1}
          onValueChange={this._onValueChange}
        />
      <MovieGrid
        shows={this.state.shows}
        style={styles.grid}
        navigator={this.props.navigator}
      />
      </View>
    );
  },
});

var styles = StyleSheet.create({
});

module.exports = TopChartsHome;
