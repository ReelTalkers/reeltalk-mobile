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

  _getColorStyles: function() {
    return {
      primaryBackground: {
        backgroundColor: this.state.show.colors.primary
      },
      primaryShadow: {
        shadowColor: this.state.show.colors.primary
      },
      detailFontColor: {
        color: this.state.show.colors.detail
      },
      textFontColor: {
        color: this.state.show.colors.text
      },
      primaryBorderLeftColor: {
        borderLeftColor: this.state.show.colors.primary
      },
    };
  },

  render: function() {
    return (
      <ScrollView
        style={[styles.scrollView, this._getColorStyles().primaryBackground, styles.redDelete]}
        automaticallyAdjustContentInsets={true}
      >
        <Image
            source={{uri: this.state.show.largePoster}}
            style={styles.largeImage}
        >
          <View style={styles.summary}>
            <View style={[styles.summaryTriangle, styles.summaryTriangleLeft, this._getColorStyles().primaryShadow, this._getColorStyles().primaryBorderLeftColor]} />
            <View style={[styles.summaryTriangle, styles.summaryTriangleRight, this._getColorStyles().primaryShadow, this._getColorStyles().primaryBorderLeftColor]} />
            <View style={styles.summaryInfo}>
              <Text style={[styles.name, this._getColorStyles().textFontColor]}>{this.state.show.name}</Text>
              <Text style={[styles.summaryDetail, this._getColorStyles().detailFontColor]}>{this.state.show.year} - {this.state.show.runtime}</Text>
            </View>
          </View>
        </Image>
        <View style={[styles.content, this._getColorStyles().primaryBackground, this._getColorStyles().primaryShadow]}>
          <View style={styles.metadata}>
            <Text style={this._getColorStyles().textFontColor}>Rating: {this.state.show.rating}</Text>
            <Text style={this._getColorStyles().textFontColor}>Genre: {this.state.show.genre}</Text>
            <Text style={this._getColorStyles().textFontColor}>Director: {this.state.show.director}</Text>
            <Text style={[styles.actors, this._getColorStyles().textFontColor]}>Actors</Text>
            {this.state.show.actors.map(actor => <Text style={this._getColorStyles().textFontColor}>{actor}</Text>)}
          </View>
          <Text style={this._getColorStyles().textFontColor}>Description: {this.state.show.description}</Text>
          <Rating averageRating={this.state.show.averageRating}/>
          <Text style={this._getColorStyles().textFontColor}>Viewers also Enjoyed</Text>
          <LolomoRow header={"Others also enjoyed:"} category={json.categories[0]} onSelect={this._changeShow}/>
        </View>
      </ScrollView>
    );
  },
});

// TODO: I wonder if there is a way to not need to define this._getColorStyles().textFontColor in so many places such as give all the children the color
// TODO: Shift up summary text to ontop of triangle

var styles = StyleSheet.create({
    redDelete: {
      backgroundColor: "transparent",
    },
    scrollView: {
      flex: 1,
    },
    actors: {
      textDecorationLine: 'underline',
    },
    largeImage: {
      flex: 1,
      overflow: 'hidden',
      width: 375,
      height: 535,
    },
    summary: {
      width: 375,
      position: 'absolute',
      bottom: 0,
    },
    summaryInfo: {
      // dont like that the width is hard coded
      // width: 375,
      backgroundColor: "transparent",
      marginTop: -15,
      paddingLeft: 18,
      paddingBottom: 3,
      // TODO: add this shadow to content
      // shadowOpacity: 1,
      // shadowRadius: 10,
      // shadowOffset: {
      //   height: -25,
      //   width: 0,
      // }
    },
    name: {
      fontSize: 22,
    },
    summaryDetail: {
      fontSize: 13,
      fontWeight: "300",
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
      // borderLeftColor: colors.primary,
      shadowOpacity: 1,
      shadowRadius: 5,
      shadowOffset: {
        height: -15,
        width: -8,
      }
    },
    summaryTriangleLeft: {
      position: 'absolute',
      bottom: 0,
      left: 0
    },
    summaryTriangleRight: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      transform: [
        {scaleX: -1}
      ]
    },
    content: {
      paddingTop: 20,
      paddingLeft: 18,
      shadowOpacity: 1,
      shadowRadius: 10,
      shadowOffset: {
        height: -25,
        width: 0,
      }
    }
});

module.exports = MovieDetailView;
