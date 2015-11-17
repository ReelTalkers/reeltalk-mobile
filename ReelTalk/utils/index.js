import React, { View } from 'react-native';
import Relay from 'react-relay';

export const relayRenderScene = (route, navigator) => {
  const { title, Component, queryConfig } = route;
  return (
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
  );
};
