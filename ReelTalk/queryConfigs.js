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

export const getRootQueryConfig = () => {
  return { queries: { viewer: () => Relay.QL`query { viewer }` }, name: 'RootQueryConfig', params: {}};
}

export const getMovieDetailRoute = (id) => {
   return {
     queries: {
       show: () => Relay.QL`query { show(id: $showId) }`,
     },
     name: 'ShowDetailRoute',
     params: { showId: id }
   };
};
