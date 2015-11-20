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

class ListsHome extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.user.lists.edges),
    };
  }

  _showList(list) {
    this.props.navigator.push({
      Component: ListDetailView,
      queryConfig: getRootQueryConfig(),
      props: { listName: list.title }
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

  renderListRow(list) {
    const { user } = this.props;
    return (
      <TouchableHighlight onPress={() => this._showList(list)}>
        <View style={styles.container}>
          <View style={styles.listRow}>
            {this._getListImage(list.shows.edges)}
            <View>
              <Text style={styles.listTitle}>{list.title}</Text>
              <Text style={styles.listSubheading}>{list.shows.edges.length} items</Text>
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
             source={{uri: this.props.user.picture}}
             style={styles.circularImage}
           />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(edge) => this.renderListRow(edge.node)}
          style={styles.listView}
        />
      </ScrollView>
    );
  }
}

export default Relay.createContainer(ListsHome, {
  fragments: {
    user: () => Relay.QL`
      fragment on UserProfile {
        picture
        lists: subscribedLists(first: 5) {
          edges {
            node {
              id
              title
              shows(first: 10) {
                edges {
                  node {
                    poster
                  }
                }
              }
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
    backgroundColor: '#E6E6E6'
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
