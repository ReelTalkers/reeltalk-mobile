'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  Navigator,
  NavigatorIOS,
  View,
  TouchableOpacity,
  TouchableHighlight
} = React;

var RecommendScreen = require('./screens/RecommendScreen');
var ListsScreen = require('./screens/ListsScreen');
var TopChartsScreen = require('./screens/TopChartsScreen');
var SettingsScreen = require('./screens/SettingsScreen');

import cssVar from 'cssVar';

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {"< " + previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

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
        sceneStyle={styles.scene}
        ref="recommendRef"
        initialRoute={{
          title: 'Recommend',
          component: RecommendScreen,
          props: { userId: this.props.userId }
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />
        }
        renderScene={renderScene} />
    );
  },

  renderListsScreen: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
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
        sceneStyle={styles.scene}
        ref="chartsRef"
        initialRoute={{
          title: 'Top Charts',
          component: TopChartsScreen,
          props: { userId: this.props.userId }
        }}
        renderScene={renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />
        } />
    );
  },

  renderSettingsScreen: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
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
      paddingTop: 65,
      flex: 1,
    },
    navBar: {
      backgroundColor: 'white',
    },
    navBarText: {
      fontSize: 16,
      marginVertical: 10,
    },
    navBarTitleText: {
      color: cssVar('fbui-bluegray-60'),
      fontWeight: '500',
      marginVertical: 9,
    },
    navBarLeftButton: {
      paddingLeft: 10,
    },
    navBarRightButton: {
      paddingRight: 10,
    },
    navBarButtonText: {
      color: cssVar('fbui-accent-blue'),
    },
	});

	AppRegistry.registerComponent('ReelTalk', () => ReelTalk);

	module.exports = ReelTalk;
