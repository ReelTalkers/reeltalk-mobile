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
        //backgroundColor: "transparent",
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

  // image
  // info (shifted up to be ontop of image)
    // triangles
    // content
      // title shifted up?

  render: function() {
    return (
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={true}
      >
        <Image
            source={{uri: this.state.show.largePoster}}
            style={styles.largeImage}
        />
      <View style={styles.content}>
          <View style={styles.triangleRow}>
            <View style={[styles.triangle, styles.triangleLeft, this._getColorStyles().primaryShadow, this._getColorStyles().primaryBorderLeftColor]} />
            <View style={[styles.triangle, styles.triangleRight, this._getColorStyles().primaryShadow, this._getColorStyles().primaryBorderLeftColor]} />
          </View>
          <View style={[styles.info, this._getColorStyles().primaryBackground, this._getColorStyles().primaryShadow]}>
            <View style={styles.header}>
              <Text style={[styles.name, this._getColorStyles().textFontColor]}>{this.state.show.name}</Text>
              <Text style={[styles.specs, this._getColorStyles().detailFontColor]}>{this.state.show.year} - {this.state.show.runtime}</Text>
            </View>
            <View>
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
          </View>
        </View>
      </ScrollView>
    );
  },
});

// TODO: I wonder if there is a way to not need to define this._getColorStyles().textFontColor in so many places such as give all the children the color
// TODO: Shift up summary text to ontop of triangle
var triangleHeight = 30;

var styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    largeImage: {
      flex: 1,
      overflow: 'hidden',
      width: 375,
      height: 535,
    },
    triangleRow: {
      height: triangleHeight,
    },
    triangle: {
      backgroundColor: 'transparent',
      borderTopWidth: triangleHeight,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 150,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      shadowOpacity: 1,
      shadowRadius: 5,
      shadowOffset: {
        height: -11,
        width: -8,
      }
    },
    triangleLeft: {
      position: 'absolute',
      left: 0
    },
    triangleRight: {
      position: 'absolute',
      right: 0,
      transform: [
        {scaleX: -1}
      ]
    },
    content: {
      backgroundColor: "transparent",
      marginTop: -triangleHeight,
    },
    info: {
      paddingLeft: 18,
      shadowOpacity: 1,
      shadowRadius: 10,
      shadowOffset: {
        height: -23,
        width: 0,
      }
    },
    header: {
      backgroundColor: "transparent",
      marginTop: -triangleHeight,
      marginBottom: triangleHeight,
    },
    name: {
      fontSize: 22,
    },
    specs: {
      fontSize: 13,
      fontWeight: "300",
    },
    actors: {
      textDecorationLine: 'underline',
    },
});

module.exports = MovieDetailView;
