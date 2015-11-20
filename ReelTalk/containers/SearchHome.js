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

class SearchHome extends React.Component {

  constructor(props) {
    super(props);
    const { viewer } = this.props
    viewer.shows.edges.map(edge => console.log(edge.node))
  	this.state = {
  		isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
  	};
	}

  onSearchChange(event) {
    this.searchMovies(event.nativeEvent.text);
  }

  searchMovies(query) {
    this.props.relay.setVariables({
      searchTerm: query,
    });
  }

  render() {
    return (
      <View>
        <SearchBar
          onSearchChange={this.onSearchChange}
          isLoading={this.state.isLoading}
          onFocus={() =>
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo(0, 0)}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
        />
        <Text>Welcome {this.props.viewer.users.edges[0].node.user.firstName}!</Text>
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
