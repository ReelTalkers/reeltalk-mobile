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

export default class Lolomo extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log(props.viewer)
    this.state = {
      dataSource: ds.cloneWithRows(Object.keys(props.viewer).filter(k => !k.startsWith('__')))
    };
  }

  _showDetails(show) {
    this.props.navigator.push({
      title: show.title,
      component: MovieDetailView,
      props: { initialShow: show, userId: this.props.userId }
    });
  }

  renderLolomoRow(categoryName) {
    console.log(this.props.viewer)
    console.log(categoryName)
    console.log(this.props.viewer[categoryName])
    return (
      <LolomoRow shows={this.props.viewer[categoryName]} categoryName={categoryName} onSelect={(show) => this._showDetails(show)}/>
    )
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
