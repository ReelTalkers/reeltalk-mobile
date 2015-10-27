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


var Lolomo = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.categories),
    };
  },

  renderLolomoRow: function(show) {
    return (
      <LolomoRow show={show}/>
    )
  },

  render: function() {
    return (
      <View style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderLolomoRow}
          style={styles.listView}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
    },
    listView: {
    paddingTop: 20,
    backgroundColor: 'white',
    height: 457,
  },
});

module.exports = Lolomo;
