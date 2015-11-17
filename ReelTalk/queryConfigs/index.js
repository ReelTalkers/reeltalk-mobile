'use strict'

import Relay from 'react-relay';

export const getUserQueryConfig = (id) => {
  return {
    queries: { user: () => Relay.QL`query { user(id: $userId) }`, },
    name: 'UserQueryConfig',
    params: { userId: id }
  };
};

export const getRootQueryConfig = () => {
  return { queries: { viewer: () => Relay.QL`query { viewer }` }, name: 'RootQueryConfig', params: {}};
};

export const getMovieDetailQueryConfig = (id) => {
   return {
     queries: {
       show: () => Relay.QL`query { show(id: $showId) }`,
     },
     name: 'ShowDetailRoute',
     params: { showId: id }
   };
};
