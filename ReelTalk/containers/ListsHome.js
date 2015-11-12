'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  View,
} = React;

var Billboard = require('./Billboard');
var Lolomo = require('./Lolomo');

var json = require("../Data");
var lists = [{"name": "Favs", "count": 5}, {"name": "Funny", "count": 10}, {"name": "Mom's Favs", "count": 2}, {"name": "Horrible", "count": 8}];

var ListsHome = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(lists),
    };
  },

  renderListRow: function(list) {
    return (
      <View>
        <Text>{list.name}</Text>
        <Text>{list.count}</Text>
      </View>
    )
  },

  render: function() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
           <Image
             source={{uri: json.users[this.props.userId].picture}}
             style={styles.image}
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

var styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lolomo: {
    flex: 1,
  },
  image: {
    marginTop: 15,
    width: 125,
    height: 125,
    borderRadius: 125/2,
  },
});

module.exports = ListsHome;
