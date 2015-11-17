'use strict';

import React, {
  AppRegistry,
  BackAndroid,
  PixelRatio,
  StyleSheet,
  Navigator,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import Relay from 'react-relay';
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8000/graphql')
)

import { relayRenderScene } from './utils';
import { getRootQueryConfig } from './queryConfigs';
import RecommendHome from './containers/RecommendHome';
import SettingsHome from './containers/SettingsHome';

var _navigator;

export default class ReelTalk extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'recommend',
      userId: '2'
    };
  }

  componentWillMount() {
    this._navBarRouteMapper = {
      rightContentForRoute: function(route, navigator) {
        return null;
      },
      titleContentForRoute: function(route, navigator) {
        return (
          <TouchableOpacity
            onPress={() => {}}>
            <Text style={styles.titleText}>{route.title}</Text>
          </TouchableOpacity>
        );
      },
      iconForRoute: function(route, navigator) {
        return (
          <TouchableOpacity
            onPress={() => { navigator.popToRoute(route); }}
            style={route.crumbIconStyle || styles.crumbIconPlaceholder}
          />
        );
      },
      separatorForRoute: function(route, navigator) {
        return (
          <TouchableOpacity
            onPress={navigator.pop}
            style={styles.crumbSeparatorPlaceholder}
          />
        );
      }
    };
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          title: 'Recommend',
          Component: SettingsHome,
          queryConfig: getRootQueryConfig(),
          props: { userId: this.state.userId }
        }}
        navigationBar={
          <Navigator.BreadcrumbNavigationBar
            routeMapper={this._navBarRouteMapper}
          />
        }
        sceneStyle={styles.scene}
        renderScene={(route, navigator) => {
          _navigator = navigator;
          return relayRenderScene(route, navigator);
        }}
        onBack={() => {
          if (route.title !== 'Recommend') {
            navigator.pop();
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    paddingTop: 50,
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  titleText: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 32,
  },
  container: {
    overflow: 'hidden',
    backgroundColor: '#dddddd',
    flex: 1,
  },
  crumbIconPlaceholder: {
    flex: 1,
    backgroundColor: '#666666',
  },
  crumbSeparatorPlaceholder: {
    flex: 1,
    backgroundColor: '#aaaaaa',
  },
});


BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

AppRegistry.registerComponent('ReelTalk', () => ReelTalk);
