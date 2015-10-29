// TODO break into components
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} = React;

var Rating = require('../components/Rating');
var LolomoRow = require('./LolomoRow');
var json = require("../Data");

var MovieDetailView = React.createClass({
  getInitialState: function() {
  	return {
  		show: this.props.initialShow,
  	};
	},

  _changeShow: function(newShow) {
    this.setState({
      show: newShow,
    });
  },

  render: function() {
    return (
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={false}
      >
        <Image
            source={{uri: this.state.show.largePoster}}
            style={styles.largeImage}
        >
          <View style={styles.summary}>
            <View style={[styles.summaryTriangle, styles.summaryTriangleLeft]} />
            <View style={[styles.summaryTriangle, styles.summaryTriangleRight]} />
            <View style={[styles.summaryInfo, styles.paletteBackground]}>
              <Text style={[styles.name, styles.paletteFont]}>{this.state.show.name}</Text>
              <Text style={[styles.summaryDetail, styles.paletteDetailFont]}>{this.state.show.year} - {this.state.show.runtime}</Text>
            </View>
          </View>
        </Image>
        <View style={[styles.content, styles.paletteBackground]}>
          <View style={styles.metadata}>
            <Text style={styles.paletteFont}>Rating: {this.state.show.rating}</Text>
            <Text style={styles.paletteFont}>Genre: {this.state.show.genre}</Text>
            <Text style={styles.paletteFont}>Director: {this.state.show.director}</Text>
            <Text style={[styles.actors, styles.paletteFont]}>Actors</Text>
            {this.state.show.actors.map(actor => <Text style={styles.paletteFont}>{actor}</Text>)}
          </View>
          <Text style={styles.paletteFont}>Description: {this.state.show.description}</Text>
          <Rating averageRating={this.state.show.averageRating}/>
          <Text style={styles.paletteFont}>Viewers also Enjoyed</Text>
          <LolomoRow header={"Others also enjoyed:"} category={json.categories[0]} onSelect={this._changeShow}/>
        </View>
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      marginBottom: 50,
      backgroundColor: 'rgba(208, 206, 184, 1)',
    },
    actors: {
      textDecorationLine: 'underline',
    },
    largeImage: {
      flex: 1,
      overflow: 'hidden',
      width: 375,
      height: 525,
    },
    summary: {
      position: 'absolute',
      bottom: 0,
    },
    summaryInfo: {
      // dont like that the width is hard coded
      width: 375,
      paddingLeft: 18,
      paddingTop: 3,
      paddingBottom: 3,
      shadowColor: "rgba(208, 206, 184, 1)",
      shadowOpacity: 1,
      shadowRadius: 10,
      shadowOffset: {
        height: -25,
        width: 0,
      }
    },
    name: {
      fontSize: 22,
    },
    summaryDetail: {
      fontSize: 13,
      fontWeight: "300",
    },
    paletteBackground: {
      backgroundColor: 'rgba(208, 206, 184, 1)',
    },
    paletteFont: {
      color: 'rgb(57, 35, 29)',
    },
    paletteDetailFont: {
      color: 'rgb(169, 116, 56)',
    },
    summaryTriangle: {
      backgroundColor: 'transparent',
      borderTopWidth: 30,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 150,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      borderLeftColor: 'rgba(208, 206, 184, 1)',
      shadowColor: "rgba(208, 206, 184, 1)",
      shadowOpacity: 1,
      shadowRadius: 5,
      shadowOffset: {
        height: -15,
        width: -8,
      }
    },
    summaryTriangleLeft: {
      position: 'absolute',
      top: -20,
      left: 0
    },
    summaryTriangleRight: {
      position: 'absolute',
      top: -20,
      right: 0,
      transform: [
        {scaleX: -1}
      ]
    },
    content: {
      paddingTop: 20,
      paddingLeft: 18,
    }
});

module.exports = MovieDetailView;
