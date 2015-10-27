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
      <LolomoRow navigator={this.props.navigator} category={show}/>
    )
  },

  render: function() {
    return (
      <View style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          automaticallyAdjustContentInsets={false}
          renderRow={this.renderLolomoRow}
          style={styles.listView}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    listView: {
      backgroundColor: 'white',
      width: 375,
      height: 435,
  },
});

module.exports = Lolomo;
