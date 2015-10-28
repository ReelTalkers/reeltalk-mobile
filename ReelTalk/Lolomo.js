'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

var json = require("./Data");
var LolomoRow = require('./LolomoRow');
var Billboard = require('./Billboard');


var Lolomo = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.categories),
    };
  },

  renderLolomoRow: function(show) {
    return (
      <LolomoRow category={show}/>
    )
  },

  renderBillboard: function() {
    return (
      <Billboard
        userId={this.props.userId}
      />
    )
  },

  render: function() {
    return (
      <ListView
        // TODO: not sure if I like that a header is part of a Lolomo
        renderHeader={this.renderBillboard}
        dataSource={this.state.dataSource}
        automaticallyAdjustContentInsets={false}
        renderRow={this.renderLolomoRow}
        style={styles.listView}
      />
    );
  },
});

var styles = StyleSheet.create({
    listView: {
      backgroundColor: 'white',
  },
});

module.exports = Lolomo;
