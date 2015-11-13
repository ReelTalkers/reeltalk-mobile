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

  renderListRow: function(list) {
    return (
      <TouchableHighlight style={styles.container} onPress={()=>this._showList(list)}>
       <View style={styles.horizontal}>
         <Image
             source={{uri: json.shows[list.shows[0]].thumbnail}}
             style={styles.image}
         />
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

var styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
  },
  displayData: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 100,
    margin: 2,
  },
  circularImage: {
    marginTop: 15,
    width: 125,
    height: 125,
    borderRadius: 125/2,
  },
});

module.exports = ListsHome;
