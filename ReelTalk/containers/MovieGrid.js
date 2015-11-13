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
    var movies = this.props.shows.slice(0);
    var moviesSplit = [];
    var size = 3;
    while (movies.length > 0) {
      moviesSplit.push(movies.splice(0, size));
    }
    return {
      dataSource: ds.cloneWithRows(moviesSplit),
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

  createThumbnail: function(showID) {
    const show =json.shows[showID];
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

  renderGridRow: function(shows) {
    return (
    <View style={styles.container}>
      {shows.map(showID => this.createThumbnail(showID))}
    </View>
    )
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderGridRow}
        style={styles.listView}
      />
    );
  },
});

var styles = StyleSheet.create({
  listView: {
    flex: 1,
    // TODO: Thi is just a hot fix, remove this.
    height: 667,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
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
  // TODO: un hard code the widths and take into account less than 3 in a row
  image: {
    width: 115,
    height: 172,
  },
});

module.exports = MovieGrid;
