'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  TouchableHighlight,
  View,
} = React;

var json = require("../Data");
var screen = require('Dimensions').get('window');

var MovieDetailView = require("./MovieDetailView");

var MovieGrid = React.createClass({

  getInitialState: function() {
    console.log(this.props.shows);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.shows),
    };
  },

  _showDetails: function(show) {
    this.props.navigator.push({
      title: show.name,
      component: MovieDetailView,
      props: {
        initialShow: show,
        ...this.props,
      },
    });
  },

  renderGridComponent: function(showID) {
    const show = json.shows[showID];
    return (
      <TouchableHighlight
        style={styles.movieButton}
        onPress={()=>this._showDetails(show)}
      >
        <Image
            source={{uri: show.thumbnail}}
            style={styles.image}
        />
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderGridComponent}
          style={this.listView}
          contentContainerStyle={styles.listViewContainer}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  },
});

// TODO: not sure that this is the best way to do it, but cant think of how to use flexbox and maintain ratio
// enough space for 3 images and padding arround them
var posterMargin = 5;
// left and right of all 3 images and on wrapper = 8
var totalSpacing = posterMargin * 8;
var posterWidth = (screen.width - totalSpacing) / 3;
var posterRatio = 172 / 115;

var styles = StyleSheet.create({
  container: {
    margin: posterMargin,
    // TODO: height only temp fix for bug
    height: screen.height,
  },
  listView: {
    flex: 1,
  },
  listViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movieButton: {
    margin: posterMargin,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  image: {
    width: posterWidth,
    height: posterWidth * posterRatio,
  },
});

module.exports = MovieGrid;
