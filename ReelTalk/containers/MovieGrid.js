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

var json = require("../Data");
import MovieDetailView from "./MovieDetailView";

class MovieGrid extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.shows),
    };
  }

  _showDetails(show) {
    this.props.navigator.push({
      title: show.name,
      component: MovieDetailView,
      props: {
        initialShow: show,
        ...this.props,
      },
    });
  }

  renderGridComponent(showID) {
    const show = json.shows[showID];
    return (
      <TouchableHighlight
        style={styles.movieButton}
        onPress={()=>this._showDetails(show)}
      >
        <Image
            source={{uri: show.thumbnail}}
            style={styles.image}
        />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderGridComponent}
        style={this.listView}
        contentContainerStyle={styles.listViewContainer}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
}

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
