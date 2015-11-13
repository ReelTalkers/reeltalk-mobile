'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
} = React;

var Billboard = require('./Billboard');
var Lolomo = require('./Lolomo');
var json = require("../Data");

var RecommendHome = React.createClass({
  getInitialState: function() {
    return {
      categories: json.categories,
    };
  },

  defaultCategories:function() {
    this.setState({
      categories: json.categories
    });
  },

  reversedDict: function(category) {
      return {name: category.name, shows: category.shows.reverse()}
  },

  amendCategories: function() {
    var updatedCategories = this.state.categories.reverse().map(category => this.reversedDict(category))
    this.setState({
      categories: updatedCategories
    });
    console.log(updatedCategories)
  },

  render: function() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
          <Billboard userId={this.props.userId}
            navigator={this.props.navigator}
            amendCategories={this.amendCategories}
            defaultCategories={this.defaultCategories}/>
        </View>
        <Lolomo
          style={styles.lolomo}
          navigator={this.props.navigator}
          userId={this.props.userId}
          categories={this.state.categories}
        />
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
  },
  lolomo: {
    flex: 1,
  },
});

module.exports = RecommendHome;
