'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
} = React;

var RecommendScreen = require('./RecommendScreen');
var ListsScreen = require('./ListsScreen');
var TopChartsScreen = require('./TopChartsScreen');
var SettingsScreen = require('./SettingsScreen');

var ReelTalk = React.createClass({

	getInitialState: function() {
    	return {
    		selectedTab: 'recommend',
    		userId: '1',
    	};
  	},

	render: function() {
	return (
		<TabBarIOS selectedTab={this.state.selectedTab}>
	    <TabBarIOS.Item
	      selected={this.state.selectedTab === 'recommend'}
	      systemIcon="favorites"
	      onPress={() => {
	          this.setState({
	              selectedTab: 'recommend',
	          });
	      }}>
	        <RecommendScreen
	          userId={this.state.userId}
	        />
	    </TabBarIOS.Item>

	    <TabBarIOS.Item
	      selected={this.state.selectedTab === 'lists'}
	      systemIcon="bookmarks"
	      onPress={() => {
	            this.setState({
	                selectedTab: 'lists',
	            });
	      }}>
	      <ListsScreen/>
	    </TabBarIOS.Item>

	    <TabBarIOS.Item
	      selected={this.state.selectedTab === 'charts'}
	      systemIcon="most-viewed"
	      onPress={() => {
	            this.setState({
	                selectedTab: 'charts',
	            });
	      }}>
	      <TopChartsScreen/>
	    </TabBarIOS.Item>

	    <TabBarIOS.Item
	      selected={this.state.selectedTab === 'settings'}
	      systemIcon="more"
	      onPress={() => {
	            this.setState({
	                selectedTab: 'settings',
	            });
	      }}>
	      <SettingsScreen/>
	    </TabBarIOS.Item>

	  </TabBarIOS>
	);
	}
	});

	var styles = StyleSheet.create({
		container: {
			backgroundColor: 'white',
		},
	});

	AppRegistry.registerComponent('ReelTalk', () => ReelTalk);

	module.exports = ReelTalk;
