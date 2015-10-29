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

  renderShowRow: function(show, sectionID, rowID, highlightRow){
    console.log(show);
    return (
      <ShowRow navigator={this.props.navigator} show={show} rank={parseInt(rowID) + 1}/>
    )
  },

  _onValueChange(value) {
    const newList = (value === 'Today') ? json.categories[0].shows : json.categories[2].shows;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(newList),
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <SegmentedControlIOS
          values={["This Week", "Today"]}
          selectedIndex={1}
          onValueChange={this._onValueChange}
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
