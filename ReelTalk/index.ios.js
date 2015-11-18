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

import Relay from 'react-relay';
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8000/graphql')
);
import cssVar from 'cssVar';

import RecommendHome from './containers/RecommendHome';
import ListsHome from './containers/ListsHome';
import TopChartsHome from './containers/TopChartsHome';
import SettingsHome from './containers/SettingsHome';

import { relayRenderScene } from './utils';
import { getRootQueryConfig, getUserQueryConfig, getRecommendHomeQueryConfig } from './queryConfigs';

const FIRST_USER_ID = 'VXNlclByb2ZpbGU6MQ==';

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
    return (null);
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
};

const RecommendBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarSymbolText, styles.navBarButtonText]}>
          {"<"}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (null)
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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: props.activeTab }
  }

  renderRecommendHome() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="recommendRef"
        initialRoute={{
          title: 'Recommend',
          Component: RecommendHome,
          queryConfig: getRecommendHomeQueryConfig(FIRST_USER_ID),
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={RecommendBarRouteMapper}
            style={styles.navBar} />
        }
        renderScene={relayRenderScene} />
    );
  }

  renderListsHome() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="listsRef"
        initialRoute={{
          title: 'Lists',
          Component: ListsHome,
          queryConfig: getUserQueryConfig(FIRST_USER_ID),
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
  }

  renderTopChartsHome() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="chartsRef"
        initialRoute={{
          title: 'Top Charts',
          Component: TopChartsHome,
          queryConfig: getRootQueryConfig(),
        }}
        renderScene={relayRenderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />
        } />
    );
  }

  renderSettingsHome() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="settingsRef"
        initialRoute={{
          title: 'Settings',
          Component: SettingsHome,
          queryConfig: getRootQueryConfig(),
        }}
        renderScene={relayRenderScene} />
    );
  }

  _onPressTab(tabTitle) {
    if (this.state.selectedTab !== tabTitle) {
      this.setState({
        selectedTab: tabTitle
      });
    } else {
      this.refs[tabTitle + 'Ref'].popToTop();
    }
  }

  render() {
    return (
      <TabBarIOS>
  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'recommend'}
  	      systemIcon="favorites"
  	      onPress={() => this._onPressTab('recommend')}>
          {this.renderRecommendHome()}

  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'lists'}
  	      systemIcon="bookmarks"
  	      onPress={() => this._onPressTab('lists')}>
          {this.renderListsHome()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'charts'}
  	      systemIcon="most-viewed"
  	      onPress={() => this._onPressTab('charts')}>
          {this.renderTopChartsHome()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'settings'}
  	      systemIcon="more"
  	      onPress={() => this._onPressTab('settings')}>
  	      {this.renderSettingsHome()}
  	    </TabBarIOS.Item>

  	  </TabBarIOS>
    );
  }
}

export default class ReelTalk extends React.Component {
	render() {
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
            activeTab: 'recommend'
          }
        }}
      />
  	);
	}
}

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
    marginRight: 10,
  },
  navBarSymbolText: {
    fontSize: 22,
    marginVertical: 10,
    marginRight: 10,
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
