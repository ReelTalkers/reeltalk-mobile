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

var MovieDetailView = require("./MovieDetailView");

var MovieGrid = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var movies = this.props.shows;
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

  createThumbnail: function(show) {
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
      {shows.map(show => this.createThumbnail(show))}
    </View>
    )
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderGridRow}
        style={styles.listView}
        showsVerticalScrollIndicator={false}
      />
    );
  },
});

var styles = StyleSheet.create({
  listView: {
     backgroundColor: 'white',
     height: 500,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  image: {
    width: 138,
    height: 206,
  },
});

module.exports = MovieGrid;
