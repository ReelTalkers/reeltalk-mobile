'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  Navigator,
  NavigatorIOS,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import RecommendHome from './containers/RecommendHome';
import ListsHome from './containers/ListsHome';
import TopChartsHome from './containers/TopChartsHome';
import SettingsHome from './containers/Billboard';

import Relay from 'react-relay';
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8000/graphql')
);

import cssVar from 'cssVar';

import { getRootQueryConfig } from './queryConfigs';

const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {"<"}
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

const ListsNavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return (
      <TouchableOpacity
        onPress={() => console.log("Add list")}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {"+"}
        </Text>
      </TouchableOpacity>
    );
    }

    const previousRoute = navState.routeStack[index - 1];
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
    return (
      <TouchableOpacity
        onPress={() => console.log("Edit list")}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {index === 0 ? "Edit" : "..."}
        </Text>
      </TouchableOpacity>
    );
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

  renderRecommendHome: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="recommendRef"
        initialRoute={{
          title: 'Recommend',
          Component: RecommendHome,
          queryConfig: getRootQueryConfig(),
          props: { userId: this.props.userId }
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />
        }
        renderScene={relayRenderScene} />
    );
  },

  renderListsHome: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="listsRef"
        initialRoute={{
          title: 'Lists',
          Component: ListsHome,
          queryConfig: getRootQueryConfig(),
          props: { userId: this.props.userId },
          rightButtonTitle: 'Edit'
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={ListsNavigationBarRouteMapper}
            style={styles.navBar}
             />
        }
        renderScene={relayRenderScene} />
    );
  },

  renderTopChartsHome: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="chartsRef"
        initialRoute={{
          title: 'Top Charts',
          Component: TopChartsHome,
          queryConfig: getRootQueryConfig(),
          props: { userId: this.props.userId }
        }}
        renderScene={relayRenderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />
        } />
    );
  },

  renderSettingsHome: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="settingsRef"
        initialRoute={{
          title: 'Settings',
          Component: SettingsHome,
          queryConfig: getRootQueryConfig(),
          props: { userId: this.props.userId }
        }}
        renderScene={relayRenderScene} />
    );
  },

  _onPressTab: function (tabTitle) {
    if (this.state.selectedTab !== tabTitle) {
      this.setState({
        selectedTab: tabTitle
      });
    } else {
      this.refs[tabTitle + 'Ref'].popToTop();
    }
  },

  render: function() {
    return (
      <TabBarIOS>
  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'recommend'}
          ref="recommendTabRef"
  	      systemIcon="favorites"
  	      onPress={() => this._onPressTab('recommend')}>
          {this.renderRecommendHome()}

  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'lists'}
          ref="listsTabRef"
  	      systemIcon="bookmarks"
  	      onPress={() => this._onPressTab('lists')}>
          {this.renderListsHome()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'charts'}
          ref="chartsTabRef"
  	      systemIcon="most-viewed"
  	      onPress={() => this._onPressTab('charts')}>
          {this.renderTopChartsHome()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'settings'}
          ref="settingsTabRef"
  	      systemIcon="more"
  	      onPress={() => this._onPressTab('settings')}>
  	      {this.renderSettingsHome()}
  	    </TabBarIOS.Item>

  	  </TabBarIOS>
    );
  }
});

const ReelTalk = React.createClass({
	getInitialState: function() {
    	return {
    		userId: '2',
    	};
  	},

	render: function() {
  	return (
      <Navigator
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={(route, navigator) => {
          const { Component } = route;
          return (
            <View style={styles.container}>
              <Component
                route={route}
                navigator={navigator}
                topNavigator={navigator}
                {...route.props} />
            </View>
          );
        }}
        initialRoute={{
          title: 'ReelTalk',
          Component: Main,
          props: {
            userId: this.state.userId,
            activeTab: 'recommend'
          }
        }}
      />
  	);
	}
});

const relayRenderScene = (route, navigator) => {
  const { title, Component, queryConfig } = route;
  return (
    <View style={styles.container}>
      <Relay.RootContainer
        Component={Component}
        route={queryConfig}
        renderFetched={(data) => (
          <Component
            route={route}
            navigator={navigator}
            topNavigator={navigator}
            {...data}
            {...route.props} />
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
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
