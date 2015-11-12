'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  View,
} = React;

var Lolomo = React.createClass({

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

  createThumbnail: function(show) {
    console.log(show.name);
    return (

        <Image
            source={{uri: show.thumbnail}}
            style={styles.image}
        />
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

module.exports = Lolomo;
