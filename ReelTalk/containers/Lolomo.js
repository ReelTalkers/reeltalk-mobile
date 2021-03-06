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

import { getMovieDetailQueryConfig } from '../queryConfigs';

class Lolomo extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(Object.keys(props.viewer).filter(k => !k.startsWith('__')))
    };
  }

  componentWillMount() {
    this.props.relay.setVariables({
      userIds: this.props.userIds.join(',')
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.relay.variables.userIds === nextProps.relay.variables.userIds) {
      return;
    }
    nextProps.relay.setVariables({
      userIds: nextProps.userIds.join(',')
    });
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(Object.keys(nextProps.viewer).filter(k => !k.startsWith('__')))
    });
  }

  _showDetails(showTitle, showId) {
    this.props.changeTransparency(true);
    this.props.navigator.push({
      title: showTitle,
      Component: MovieDetailView,
      queryConfig: getMovieDetailQueryConfig(showId)
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
  initialVariables: {
    userIds: "VXNlclByb2ZpbGU6MQ=="
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        Recommended: recommendShows(first: 10, user_ids: $userIds) {
          ${LolomoRow.getFragment('shows')}
        }
        Action: allShows(first: 10, genre: "Action") {
          ${LolomoRow.getFragment('shows')}
        }
        Dramas: allShows(first: 10, genre: "Drama") {
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
