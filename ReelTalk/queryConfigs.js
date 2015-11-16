'use strict'

import Relay from 'react-relay';

export class UserQueryConfig extends Relay.Route {};
UserQueryConfig.routeName = 'UserQueryConfig';
UserQueryConfig.queries = {
  user: () => Relay.QL`
    query {
      user(id: $userID)
    }
  `
};
UserQueryConfig.paramDefinitions = {
  userID: {required: true},
};

export class RootQueryConfig extends Relay.Route {}
RootQueryConfig.routeName = 'RootQueryConfig';
RootQueryConfig.queries = {
  viewer: () => Relay.QL`query RootQuery { viewer }`
};
