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

var RecommendHome = React.createClass({
  render: function() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
          <Billboard userId={this.props.userId}
            navigator={this.props.navigator}/>
        </View>
        <Lolomo
          style={styles.lolomo}
          navigator={this.props.navigator}
          userId={this.props.userId}
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
