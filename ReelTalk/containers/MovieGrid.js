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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderGridComponent}
        style={this.listView}
        contentContainerStyle={styles.listViewContainer}
        automaticallyAdjustContentInsets={false}
      />
    );
  },
});

var styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  listViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  movieButton: {
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  image: {
    width: 115,
    height: 172,
  },
});

module.exports = MovieGrid;
