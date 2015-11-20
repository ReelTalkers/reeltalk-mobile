'use strict';

import React, {
  AppRegistry,
  StyleSheet,
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
import SearchHome from './containers/SearchHome';

import { relayRenderScene } from './utils';
import { getRootQueryConfig, getUserQueryConfig, getRecommendHomeQueryConfig } from './queryConfigs';

import { TabBarIOS, Icon, } from 'react-native-icons';
const TabBarItemIOS = TabBarIOS.Item;

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
        <Icon
          name='ion|chevron-left'
          size={20}
          style={[{width: 10, height: 42, marginRight: 5}]}
        />
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

const getRecommendBarRouteMapper = (changeTransparency) => {
  const RecommendBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
      if (index === 0) {
        return null;
      }

      const previousRoute = navState.routeStack[index - 1];
      return (
        <TouchableOpacity
          onPress={() => {changeTransparency(false); navigator.pop();}}
          style={styles.navBarLeftButton}>
          {/* TODO: all of these icons are messy, clean up */}
          <Icon
            name='ion|chevron-left'
            size={20}
            style={[{width: 10, height: 42, marginRight: 5}]}
          />
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
  return RecommendBarRouteMapper;
}

const ListsNavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return (
      <TouchableOpacity
        onPress={() => console.log("Add list")}
        style={styles.navBarLeftButton}>
        <Icon
          name='ion|ios-plus-empty'
          size={30}
          style={[{width: 30, height: 42, marginRight: 5}]}
        />
      </TouchableOpacity>
    );
    }

    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name='ion|chevron-left'
            size={20}
            style={[{width: 10, height: 42, marginRight: 5}]}
          />
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            {previousRoute.title}
          </Text>
        </View>
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
    this.state = {
      selectedTab: props.activeTab,
      transparentBar: false
    }
  }

  setTransparent(transparent) {
    console.log("Called")
    this.setState({
      transparentBar: transparent
    });
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
          props: {
            changeTransparency: (transparent) => this.setTransparent(transparent)
          }
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={getRecommendBarRouteMapper((transparent) => this.setTransparent(transparent))}
            style={this.state.transparentBar ? styles.transparent : styles.navBar} />
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

  renderSearchHome() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="searchRef"
        initialRoute={{
          title: 'Search',
          Component: SearchHome,
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
          name="recommend"
          iconName={'ion|ios-monitor-outline'}
          selectedIconName={'ion|ios-monitor'}
          title={'Recommend'}
          iconSize={32}
  	      selected={this.state.selectedTab === 'recommend'}
  	      onPress={() => this._onPressTab('recommend')}>
          {this.renderRecommendHome()}

  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
          name="lists"
          iconName={'ion|ios-list-outline'}
          selectedIconName={'ion|ios-list'}
          title={'Lists'}
          iconSize={32}
  	      selected={this.state.selectedTab === 'lists'}
  	      onPress={() => this._onPressTab('lists')}>
          {this.renderListsHome()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
          name="charts"
          iconName={'ion|fireball'}
          selectedIconName={'ion|fireball'}
          title={'Top Charts'}
          iconSize={32}
  	      selected={this.state.selectedTab === 'charts'}
  	      systemIcon="most-viewed"
  	      onPress={() => this._onPressTab('charts')}>
          {this.renderTopChartsHome()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
          name="search"
          iconName={'ion|ios-search'}
          selectedIconName={'ion|ios-search-strong'}
          title={'Search'}
          iconSize={32}
  	      selected={this.state.selectedTab === 'search'}
  	      //systemIcon="search"
  	      onPress={() => this._onPressTab('search')}>
  	      {this.renderSearchHome()}
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
  transparent: {
    // TODO: change to transparent for transparency
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
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
