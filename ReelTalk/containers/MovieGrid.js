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
    const showIds = this.props.shows.edges.map(edge => edge.node.id);
    const userIds = this.props.users.edges.map(edge => edge.node.id);

    const shows = props.shows ? props.shows.edges : []
    const users = props.users ? props.users.edges : []

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(shows.concat(users)),
      showIds: this.props.shows.edges.map(edge => edge.node.id),
      userIds: this.props.users.edges.map(edge => edge.node.id)
    };
  }

  componentWillReceiveProps(nextProps) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const shows = nextProps.shows ? nextProps.shows.edges : []
    const users = nextProps.users ? nextProps.users.edges : []
    this.setState({
      dataSource: ds.cloneWithRows(shows.concat(users))
    });
  }

  _showDetails(show) {
    this.props.navigator.push({
      title: show.title,
      Component: MovieDetailView,
      queryConfig: getMovieDetailQueryConfig(show.id),
      props: {...this.props},
    });
  }

  renderGridComponent(item) {
    console.log(item)
    if (this.state.userIds.indexOf(item.id) > -1) {
      return (
        <TouchableHighlight
          style={styles.movieButton}
          onPress={() => this._showDetails(item)}
        >
          <Image
              source={{uri: item.picture}}
              style={styles.image}
          />
        </TouchableHighlight>
      )
    }
    else {
      return (
        <TouchableHighlight
          style={styles.movieButton}
          onPress={() => this._showDetails(item)}
        >
          <Image
              source={{uri: item.poster}}
              style={styles.image}
          />
        </TouchableHighlight>
      );
    }
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
    `,
    users: () => Relay.QL`
      fragment on UserProfileDefaultConnection {
        edges {
          node {
            id
            picture
            user {
              firstName
              lastName
            }
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
