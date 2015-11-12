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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.categories[0].shows),
    };
  },

  _onValueChange(value) {
    const newList = (value === 'Today') ? json.categories[0].shows : json.categories[2].shows;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(newList),
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
        shows={json.categories[0].shows}
        style={styles.grid}
      />
      </View>
    );
  },
});

var styles = StyleSheet.create({
});

module.exports = TopChartsHome;
