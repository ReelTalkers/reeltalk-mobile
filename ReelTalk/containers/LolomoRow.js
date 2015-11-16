'use strict';

import React, {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const json = require("../Data");

export default class LolomoRow extends React.Component {

  createThumbnail(showID) {
    const show =json.shows[showID];
    return (
      <TouchableHighlight
        style={styles.movieButton}
        onPress={()=>this.props.onSelect(show)}
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
      <View>
        <Text style={styles.categoryName}>{this.props.header}</Text>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={styles.row}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.category.shows.map(showID => this.createThumbnail(showID))}
          <View style={styles.endOfRow}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  categoryName: {
    fontWeight: '600',
    fontSize: 17,
    color: '#929292',
    marginLeft: 5,
  },
  row: {
    paddingTop: 2,
    paddingBottom: 5,
  },
  image: {
    width: 115,
    height: 172,
  },
  movieButton: {
    marginLeft: 5,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  // added just so that we can have padding on the left and right of all movies
  endOfRow: {
    width: 5
  }
});
