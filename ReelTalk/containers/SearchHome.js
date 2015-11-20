'use strict';

import React, {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';

import SearchBar from '../components/SearchBar';
import MovieGrid from './MovieGrid';

class SearchHome extends React.Component {

  constructor(props) {
    super(props);
  	this.state = {
  		isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
  	};
	}

  searchMovies(query) {
    this.props.relay.setVariables({
      searchTerm: query,
    });
  }

  onSearchChange(event) {
    this.searchMovies(event.nativeEvent.text);
  }

  render() {
    const { viewer } = this.props
    viewer.shows.edges.map(edge => console.log(edge.node))
    return (
      <View>
        <SearchBar
          onSearchChange={(event) => this.onSearchChange(event)}
          isLoading={this.state.isLoading}
        />
        <MovieGrid
          shows={viewer.shows}
          navigator={this.props.navigator}
        />
      </View>
    );
  }
}

export default Relay.createContainer(SearchHome, {
  initialVariables: {
    searchTerm: "",
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        shows: allShows(first:10, title__contains: $searchTerm) {
          edges {
            node {
              poster
              title
            }
          }
          ${MovieGrid.getFragment('shows')}
        }
        users: allUserProfiles(first: 10, user__first_name__contains: $searchTerm) {
          edges {
            node {
              id
              user {
                firstName
              }
            }
          }
        }
      }
    `
  }
});
