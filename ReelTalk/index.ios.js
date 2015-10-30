'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Navigator,
  NavigatorIOS,
  View,
} = React;

var RecommendScreen = require('./screens/RecommendScreen');
var ListsScreen = require('./screens/ListsScreen');
var TopChartsScreen = require('./screens/TopChartsScreen');
var SettingsScreen = require('./screens/SettingsScreen');

const Main = React.createClass({
  getInitialState: function() {
    return { state: this.props.activeTab }
  },

  componentDidMount: function() {
    this.refs.recommendTabRef.setState({hasBeenSelected: true})
  },

  renderRecommendScreen: function() {
    return (
      <Navigator
        sceneStyle={styles.container}
        ref="recommendRef"
        initialRoute={{
          title: 'Recommend',
          component: RecommendScreen,
          props: { userId: this.props.userId }
        }}
        renderScene={renderScene} />
    );
  },

  renderListsScreen: function() {
    return (
      <Navigator
        style={styles.container}
        ref="listsRef"
        initialRoute={{
          title: 'Lists',
          component: ListsScreen,
          props: { userId: this.props.userId }
        }}
        renderScene={renderScene} />
    );
  },

  renderTopChartsScreen: function() {
    return (
      <Navigator
        style={styles.container}
        ref="chartsRef"
        initialRoute={{
          title: 'Top Charts',
          component: TopChartsScreen,
          props: { userId: this.props.userId }
        }}
        renderScene={renderScene} />
    );
  },

  renderSettingsScreen: function() {
    return (
      <Navigator
        style={styles.container}
        ref="settingsRef"
        initialRoute={{
          title: 'Settings',
          component: SettingsScreen,
          props: { userId: this.props.userId }
        }}
        renderScene={renderScene} />
    );
  },

  render: function() {
    return (
      <TabBarIOS>
  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'recommend'}
          ref="recommendTabRef"
  	      systemIcon="favorites"
  	      onPress={() => {
            if (this.state.selectedTab !== 'recommend') {
              this.setState({
                selectedTab: 'recommend'
              });
            } else if (this.state.selectedTab === 'recommend') {
              this.refs.recommendRef.popToTop();
            }
  	      }}>
          {this.renderRecommendScreen()}

  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'lists'}
  	      systemIcon="bookmarks"
  	      onPress={() => {
            if (this.state.selectedTab !== 'lists') {
              this.setState({
                selectedTab: 'lists'
              });
            } else if (this.state.selectedTab === 'lists') {
              this.refs.listsRef.popToTop();
            }
  	      }}>
          {this.renderListsScreen()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'charts'}
  	      systemIcon="most-viewed"
  	      onPress={() => {
            if (this.state.selectedTab !== 'charts') {
              this.setState({
                selectedTab: 'charts'
              });
            } else if (this.state.selectedTab === 'charts') {
              this.refs.chartsRef.popToTop();
            }
  	      }}>
          {this.renderTopChartsScreen()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'settings'}
  	      systemIcon="more"
  	      onPress={() => {
            if (this.state.selectedTab !== 'settings') {
              this.setState({
                selectedTab: 'settings'
              });
            } else if (this.state.selectedTab === 'settings') {
              this.refs.chartsRef.popToTop();
            }
  	      }}>
  	      {this.renderSettingsScreen()}
  	    </TabBarIOS.Item>

  	  </TabBarIOS>
    );
  }
})

var ReelTalk = React.createClass({
	getInitialState: function() {
    	return {
    		userId: '2',
    	};
  	},

	render: function() {
	return (
    <Navigator
      sceneStyle={styles.sceneStyle}
      ref={(navigator) => { this.navigator = navigator; }}
      renderScene={renderScene}
      initialRoute={{
        title: 'ReelTalk',
        component: Main,
        props: {
          userId: this.state.userId,
          activeTab: 'recommend'
        }
      }}
    />
	);
	}
});

const renderScene = (route, navigator) => {
  var Component = route.component;
  return (
    <View style={styles.container}>
      <Component
        route={route}
        navigator={navigator}
        topNavigator={navigator}
        {...route.props} />
    </View>
  );
};

	var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFD',
    },
    scene: {
      paddingTop: 50,
      flex: 1,
    },
	});

	AppRegistry.registerComponent('ReelTalk', () => ReelTalk);

	module.exports = ReelTalk;
