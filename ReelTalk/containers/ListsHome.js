'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import Relay from 'react-relay';

import Billboard from './Billboard';
import ListDetailView from './ListDetailView';

import { getRootQueryConfig } from '../queryConfigs';
import json from '../Data.json';

class ListsHome extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const viewer = this.props.viewer;
    const listNames = Object.keys(props.viewer).filter(name => !name.startsWith('__'));
    this.state = {
      dataSource: ds.cloneWithRows(listNames),
    };
  }

  _showList(listName, list) {
    this.props.navigator.push({
      Component: ListDetailView,
      queryConfig: getRootQueryConfig(),
      props: { listName }
    });
  }

  // TODO: Add cases where there are less than 4 films
  _getListImage(listShows) {
    return (
      <View style={styles.square}>
        <View style={styles.squareRow}>
          <Image
              source={{uri: listShows[0].node.poster}}
              style={styles.image}
          />
          <Image
              source={{uri: listShows[1].node.poster}}
              style={styles.image}
          />
        </View>
        <View style={styles.squareRow}>
          <Image
              source={{uri: listShows[2].node.poster}}
              style={styles.image}
          />
          <Image
              source={{uri: listShows[3].node.poster}}
              style={styles.image}
          />
        </View>
      </View>
    );
  }

  renderListRow(listName) {
    const { viewer } = this.props;
    return (
      <TouchableHighlight onPress={() => this._showList(listName, viewer[listName].edges)}>
        <View style={styles.container}>
          <View style={styles.listRow}>
            {this._getListImage(viewer[listName].edges)}
            <View>
              <Text style={styles.listTitle}>{listName}</Text>
              <Text style={styles.listSubheading}>{viewer[listName].totalCount} items</Text>
            </View>
          </View>
          <View style={styles.rowDivider}/>
        </View>
      </TouchableHighlight>
    )
  }

  // TODO: This circular image should pulled from billboard. Billboard should take an argument of what to display beneath,
  //        in this case it would just be the users name. This is like the users 'profile'
  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
           <Image
             source={{uri: json.users[this.props.userId].picture}}
             style={styles.circularImage}
           />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(name) => this.renderListRow(name)}
          style={styles.listView}
        />
      </ScrollView>
    );
  }
}

export default Relay.createContainer(ListsHome, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        Favorites: allShows(first: 4) {
          totalCount
          edges {
            node {
              poster
            }
          }
        }
        MyFavoriteComedies: allShows(last: 4) {
          totalCount
          edges {
            node {
              poster
            }
          }
        }
      }
    `
  }
});

const rowHeight = 55;

const styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularImage: {
    marginTop: 15,
    width: 125,
    height: 125,
    borderRadius: 125/2,
  },
  container: {
    backgroundColor: 'white',
  },
  listRow: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  rowDivider: {
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F1F1F1'
  },
  listTitle: {
    fontSize: 17,
  },
  listSubheading: {
    fontSize: 15,
    color: '#929292',
  },
  square: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: rowHeight,
    width: rowHeight,
    marginRight: 5,
  },
  squareRow: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
