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

import RecommendScreen from './screens/RecommendScreen';
import ListsScreen from './screens/ListsScreen';
import TopChartsScreen from './screens/TopChartsScreen';
import SettingsScreen from './screens/SettingsScreen';

import cssVar from 'cssVar';

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
          props: { userId: this.props.userId },
          rightButtonTitle: 'Edit',
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={ListsNavigationBarRouteMapper}
            style={styles.navBar}
             />
        }
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

  _onPressTab: function (tabTitle) {
    if (this.state.selectedTab !== tabTitle) {
      this.setState({
        selectedTab: tabTitle
      });
    } else if (this.state.selectedTab === 'recommend') {
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
          {this.renderRecommendScreen()}

  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'lists'}
  	      systemIcon="bookmarks"
  	      onPress={() => this._onPressTab('lists')}>
          {this.renderListsScreen()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'charts'}
  	      systemIcon="most-viewed"
  	      onPress={() => this._onPressTab('charts')}>
          {this.renderTopChartsScreen()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'settings'}
  	      systemIcon="more"
  	      onPress={() => this._onPressTab('settings')}>
  	      {this.renderSettingsScreen()}
  	    </TabBarIOS.Item>

  	  </TabBarIOS>
    );
  }
})

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
  const Component = route.component;
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
