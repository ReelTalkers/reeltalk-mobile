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
  	this.state = {
  		isLoading: false,
  	};
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
        <Text>Welcome {this.props.viewer.allUserProfiles.edges[0].node.user.firstName}!</Text>
      </View>
    );
  }
}

export default Relay.createContainer(SearchHome, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        allUserProfiles(first: 1) {
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

const styles = StyleSheet.create({
});
