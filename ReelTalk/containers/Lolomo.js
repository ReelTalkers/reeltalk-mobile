'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';

import LolomoRow from './LolomoRow';
import MovieDetailView from './MovieDetailView';

const getMovieDetailRoute = (id) => {
   return {
     queries: {
       show: () => Relay.QL`query { show(id: $showId) }`,
     },
     name: 'ShowDetailRoute',
     params: { showId: id }
   };
};

class Lolomo extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(Object.keys(props.viewer).filter(k => !k.startsWith('__')))
    };
  }

  _showDetails(showTitle, showId) {
    console.log(showTitle + ' ' + showId)
    this.props.navigator.push({
      title: showTitle,
      Component: MovieDetailView,
      queryConfig: getMovieDetailRoute(showId),
      props: { userId: this.props.userId }
    });
  }

  renderLolomoRow(categoryName) {
    return (
      <LolomoRow
        shows={this.props.viewer[categoryName]}
        categoryName={categoryName}
        onSelect={(title, id) => this._showDetails(title, id)} />
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(categoryName) => this.renderLolomoRow(categoryName)}
        style={styles.listView}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default Relay.createContainer(Lolomo, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        Comedies: allShows(first: 5) {
          ${LolomoRow.getFragment('shows')}
        }
        Romance: allShows(last: 5) {
          ${LolomoRow.getFragment('shows')}
        }
      }
    `
  }
})

const styles = StyleSheet.create({
  listView: {
     backgroundColor: 'white',
  },
});
