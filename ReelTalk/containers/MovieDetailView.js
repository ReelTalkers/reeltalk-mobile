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
var RatingSlider = require('../components/RatingSlider');
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

// TODO: Lists should not be stored within movies, there should be lists containing movies but I want to focus on design now
// TODO: make <RatingSlider style={styles.ratingSlider}/>
  render: function() {
    return (
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={true}
      >
        <Image source={{uri: this.state.show.largePoster}} style={styles.largeImage} />
        <View style={styles.content}>
          <View style={[styles.headerLine, this._getColorStyles().primaryBackground]} />
          <View style={styles.header}>
            <Text style={styles.title}>{this.state.show.name}</Text>
            <View style={styles.detail}>
              <Text style={styles.detailText}>{this.state.show.runtime}</Text>
              <Text style={styles.detailText}>{this.state.show.genre}</Text>
              <Text style={styles.detailText}>{this.state.show.year}</Text>
              <Text style={styles.detailText}>{this.state.show.rating}</Text>
            </View>
            <View style={styles.listsContainer}>
              {this.state.show.lists.map(list => <Text style={styles.listName}>{list}</Text>)}
            </View>
          </View>
          <RatingSlider
            style={styles.ratingSlider}
            defaultText="Slide to rate"
            options={[
              {text: "Terrible", color: "rgba(233, 62, 58, .7)"},
              {text: "Bad", color: "rgba(237, 104, 60, .7)"},
              {text: "Ok", color: "rgba(243, 144, 63, .7)"},
              {text: "Good", color: "rgba(253, 199, 12, .7)"},
              {text: "Fantastic", color: "rgba(255, 243, 12, .7)"}
            ]}
          />
          <Text style={styles.description}>{this.state.show.description}</Text>
        </View>
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: '#B6AEA3',
    },
    largeImage: {
      flex: 1,
      overflow: 'hidden',
      height: 470,
    },
    content: {
      backgroundColor: '#B6AEA3',
    },
    headerLine: {
      height: 3,
    },
    header: {
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 24,
    },
    title: {
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 5,
    },
    detail: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    detailText: {
      fontSize: 13,
      fontWeight: '300',
      paddingLeft: 5,
      paddingRight: 5,
    },
    listsContainer: {
      flexDirection: 'row',
    },
    listName: {
      color: '#5583B6',
      fontSize: 13,
      fontWeight: '300',
      paddingLeft: 2,
      paddingRight: 2,
    },
    ratingSlider: {
      height: 79,
      backgroundColor: '#BAB7AE',
    },
    description: {
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 14,
      fontWeight: '300'
    }
});

module.exports = MovieDetailView;
