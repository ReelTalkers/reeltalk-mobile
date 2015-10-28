'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var MovieDetailView = require("./MovieDetailView");

var ShowRow = React.createClass({
  showDetails: function(show) {
    this.props.navigator.push({
      title: show.name,
      component: MovieDetailView,
      passProps: {
        initialShow: show,
        navigator: this.props.navigator,
      },
    });
  },

  render: function() {
    return (
      <TouchableHighlight style={styles.container} onPress={()=>this.showDetails(this.props.show)}>
        <Text>{this.props.show.name}</Text>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'white',
  },
});

module.exports = ShowRow;
