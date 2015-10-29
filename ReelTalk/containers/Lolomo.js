'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

var json = require("../Data");
var LolomoRow = require('./LolomoRow');
var MovieDetailView = require('./MovieDetailView');

var Lolomo = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.categories),
    };
  },

  _showDetails: function(show) {
    this.props.navigator.push({
      name: 'showDetail',
      component: MovieDetailView,
      props: { initialShow: show }
    });
  },

  renderLolomoRow: function(category) {
    return (
      <LolomoRow header={category.name} category={category} onSelect={this._showDetails}/>
    )
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderLolomoRow}
        style={styles.listView}
        showsVerticalScrollIndicator={false}
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
