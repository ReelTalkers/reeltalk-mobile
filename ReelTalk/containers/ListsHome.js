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
      <TouchableHighlight onPress={()=>this._showList(list)}>
        <View style={styles.container}>
          <View style={styles.listRow}>
            {this._getListImage(list.shows)}
            <View>
              <Text style={styles.listTitle}>{list.name}</Text>
              <Text style={styles.listSubheading}>{list.shows.length} items</Text>
            </View>
          </View>
          <View style={styles.rowDivider}/>
        </View>
      </TouchableHighlight>
    )
  },

  // TODO: This circular image should pulled from billboard. Billboard should take an argument of what to display beneath,
  //        in this case it would just be the users name. This is like the users 'profile'
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
        />
      </ScrollView>
    );
  },
});

const rowHeight = 55;

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
  container: {
    backgroundColor: 'white',
  },
  listRow: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  rowDivider: {
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F1F1F1'
  },
  listTitle: {
    fontSize: 17,
  },
  listSubheading: {
    fontSize: 15,
    color: '#929292',
  },
  square: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: rowHeight,
    width: rowHeight,
    marginRight: 5,
  },
  squareRow: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

module.exports = ListsHome;
