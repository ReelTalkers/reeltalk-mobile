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

var screen = require('Dimensions').get('window');

import MovieDetailView from "./MovieDetailView";
import UserDetailView from "./UserDetailView";

import { getMovieDetailQueryConfig, getUserQueryConfig } from '../queryConfigs';

class MovieGrid extends React.Component {

  constructor(props) {
    super(props);
    const showIds = props.shows ? props.shows.edges.map(edge => edge.node.id) : [];
    const userIds = props.users ? props.users.edges.map(edge => edge.node.id) : [];

    const shows = props.shows ? props.shows.edges : []
    const users = props.users ? props.users.edges : []

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(shows.concat(users)),
      showIds: props.shows ? props.shows.edges.map(edge => edge.node.id) : [],
      userIds: props.users ? props.users.edges.map(edge => edge.node.id) : []
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

  _showMovieDetails(show) {
    this.props.navigator.push({
      title: show.title,
      Component: MovieDetailView,
      queryConfig: getMovieDetailQueryConfig(show.id),
      props: {...this.props},
    });
  }

  _showUserDetails(user) {
    this.props.navigator.push({
      title: user.user.firstName,
      Component: UserDetailView,
      queryConfig: getUserQueryConfig(user.id),
      props: {...this.props},
    });
  }

  renderGridComponent(item) {
    console.log(item)
    if (this.state.userIds.indexOf(item.id) > -1) {
      return (
        <TouchableHighlight
          style={styles.movieButton}
          onPress={() => this._showUserDetails(item)}
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
          onPress={() => this._showMovieDetails(item)}
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
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(edge) => this.renderGridComponent(edge.node)}
          style={this.listView}
          contentContainerStyle={styles.listViewContainer}
          automaticallyAdjustContentInsets={false}
        />
      </View>
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

// TODO: not sure that this is the best way to do it, but cant think of how to use flexbox and maintain ratio
// enough space for 3 images and padding arround them
var posterMargin = 5;
// left and right of all 3 images and on wrapper = 8
var totalSpacing = posterMargin * 8;
var posterWidth = Math.floor((screen.width - totalSpacing) / 3);
var posterRatio = 172 / 115;
var posterHeight = Math.floor(posterWidth * posterRatio);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: posterMargin,
    // TODO: height only temp fix for bug
    height: screen.height,
    // TODO: center this container so if you turn it sideways then it will be good
  },
  listView: {
    flex: 1,
  },
  listViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movieButton: {
    margin: posterMargin,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  image: {
    width: posterWidth,
    height: posterHeight,
  },
});
