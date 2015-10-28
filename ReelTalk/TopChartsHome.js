'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ListView,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
} = React;

var json = require("./Data");
var ShowRow = require("./ShowRow");

var TopChartsHome = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.categories[0].shows),
    };
  },

  renderShowRow: function(show){
    return (
      <ShowRow navigator={this.props.navigator} show={show}/>
    )
  },

  render: function() {
    return (
      <View style={styles.container}>
        <SegmentedControlIOS
          values={["This Week", "Today"]}
          selectedIndex={1}
        />
        <ListView
         dataSource={this.state.dataSource}
         automaticallyAdjustContentInsets={false}
         renderRow={this.renderShowRow}
         style={styles.listView}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
  },
});

module.exports = TopChartsHome;
