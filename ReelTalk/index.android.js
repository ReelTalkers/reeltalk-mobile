'use strict';

var React = require('react-native');
var {
  AppRegistry,
  BackAndroid,
  PixelRatio,
  StyleSheet,
  Navigator,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var cssVar = require('cssVar');

var ToolbarAndroid = require('ToolbarAndroid');
var RecommendHome = require('./containers/RecommendHome');

var _navigator;

var ReelTalk = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'recommend',
      userId: '2'
    };
  },

  componentWillMount: function() {
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
  },

  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          title: 'Recommend',
          component: RecommendHome,
          props: { userId: this.state.userId }
        }}
        navigationBar={
          <Navigator.BreadcrumbNavigationBar
            routeMapper={this._navBarRouteMapper}
          />
        }
        renderScene={(route, navigator) => {
          _navigator = navigator;
          var props = route.props;
          if (route.component) {
            return React.createElement(route.component, { navigator, ...props })
          }
        }}
        sceneStyle={styles.sceneStyle}
        onBack={() => {
          if (route.title !== 'Recommend') {
            navigator.pop();
          }
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
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
