'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  View,
} = React;

var Billboard = require('./Billboard');
var ListDetailView = require('./ListDetailView');

var json = require("../Data");

var ListsHome = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.lists),
    };
  },

  _showList: function(list) {
    this.props.navigator.push({
      component: ListDetailView,
      props: { list: list}
    });
  },

  // TODO: Add cases where there are less than 4 films
  _getListImage: function(listShows) {
    return (
      <View style={styles.square}>
        <View style={styles.squareRow}>
          <Image
              source={{uri: json.shows[listShows[0]].thumbnail}}
              style={styles.image}
          />
          <Image
              source={{uri: json.shows[listShows[1]].thumbnail}}
              style={styles.image}
          />
        </View>
        <View style={styles.squareRow}>
          <Image
              source={{uri: json.shows[listShows[2]].thumbnail}}
              style={styles.image}
          />
          <Image
              source={{uri: json.shows[listShows[3]].thumbnail}}
              style={styles.image}
          />
        </View>
      </View>
    );
  },

  renderListRow: function(list) {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={()=>this._showList(list)}>
       <View style={styles.listRow}>
         {this._getListImage(list.shows)}
         <View style={styles.displayData}>
           <Text>{list.name}</Text>
           <Text>{list.shows.length}</Text>
         </View>
       </View>
     </TouchableHighlight>
    )
  },

  render: function() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
           <Image
             source={{uri: json.users[this.props.userId].picture}}
             style={styles.circularImage}
           />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderListRow}
          style={styles.listView}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    );
  },
});

const rowHeight = 75;

var styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularImage: {
    marginTop: 15,
    width: 125,
    height: 125,
    borderRadius: 125/2,
  },
  displayData: {
    flexDirection: 'column',
  },
  container: {
    marginLeft: 5,
    marginBottom: 5,
  },
  listRow: {
    height: rowHeight,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  square: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: rowHeight,
    width: rowHeight,
    marginRight: 5,
  },
  squareRow: {
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

module.exports = ListsHome;
