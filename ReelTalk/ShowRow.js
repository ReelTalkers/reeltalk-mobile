'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
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
        <View style={styles.horizontal}>
          <Image
              source={{uri: this.props.show.thumbnail}}
              style={styles.image}
          />
          <Text>{this.props.show.name}</Text>
        </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
  },
  horizontal: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 100,
    margin: 2,
  },
});

module.exports = ShowRow;
