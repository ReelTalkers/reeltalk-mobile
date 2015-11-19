'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Relay from 'react-relay';

import MovieDetailView from "./MovieDetailView";

import { getMovieDetailQueryConfig } from '../queryConfigs';

class MovieGrid extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.shows.edges),
    };
  }

  _showDetails(show) {
    this.props.navigator.push({
      title: show.title,
      Component: MovieDetailView,
      queryConfig: getMovieDetailQueryConfig(show.id),
      props: {...this.props},
    });
  }

  renderGridComponent(show) {
    return (
      <TouchableHighlight
        style={styles.movieButton}
        onPress={() => this._showDetails(show)}
      >
        <Image
            source={{uri: show.poster}}
            style={styles.image}
        />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(edge) => this.renderGridComponent(edge.node)}
        style={styles.listView}
        contentContainerStyle={styles.listViewContainer}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
}

export default Relay.createContainer(MovieGrid, {
  fragments: {
    shows: () => Relay.QL`
      fragment on ShowConnection {
        edges {
          node {
            id
            title
            poster
          }
        }
      }
    `
  }
});

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  listViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  movieButton: {
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  image: {
    width: 115,
    height: 172,
  },
});
