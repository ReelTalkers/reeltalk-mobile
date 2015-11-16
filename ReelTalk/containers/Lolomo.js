'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} from 'react-native';

const json = require("../Data");
import LolomoRow from './LolomoRow';
import MovieDetailView from './MovieDetailView';

export default class Lolomo extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(json.categories),
    };
  }

  _showDetails(show) {
    this.props.navigator.push({
      title: show.name,
      component: MovieDetailView,
      props: { initialShow: show, userId: this.props.userId }
    });
  }

  renderLolomoRow(category) {
    return (
      <LolomoRow header={category.name} category={category} onSelect={(show) => this._showDetails(show)}/>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(category) => this.renderLolomoRow(category)}
        style={styles.listView}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  listView: {
     backgroundColor: 'white',
  },
});
