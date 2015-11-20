// TODO break into components
'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Relay from 'react-relay';
import ParallaxView from 'react-native-parallax-view';

import Rating from '../components/Rating';
import RatingSlider from '../components/RatingSlider';
import HeaderScrollView from '../components/HeaderScrollView';
import LolomoRow from './LolomoRow';

class MovieDetailView extends React.Component {
  constructor(props) {
    super(props);
  	this.state = {
  		show: props.show,
      scrollEnabled: true,
  	};
	}

  _changeShow(newShow) {
    this.setState({
      show: newShow,
      scrollEnabled: true,
    });
  }

  _getColorStyles() {
    return {
      primaryBackground: {
        backgroundColor: this.state.show.backgroundColor
      },
      primaryShadow: {
        shadowColor: this.state.show.backgroundColor
      },
      detailFontColor: {
        color: this.state.show.detailColor
      },
      textFontColor: {
        color: this.state.show.textColor
      },
      primaryBorderLeftColor: {
        borderLeftColor: this.state.show.backgroundColor
      },
    };
  }

  // TODO: not sure about the this.state.show... Do I even need it?
  _setScrollEnabled(scrollEnabled) {
    this.setState({
      show: this.state.show,
      scrollEnabled: scrollEnabled,
    });
  }

  _disableScroll() {
    this._setScrollEnabled(false);
  }

  _enableScroll() {
    this._setScrollEnabled(true);
  }

// TODO: Lists should not be stored within movies, there should be lists containing movies but I want to focus on design now
// TODO: make <RatingSlider style={styles.ratingSlider}/>
  render() {
    const { relatedShows } = this.props;
    const { show, scrollEnabled } = this.state;
    const cast = show.cast.edges.map(edge => edge.node.fullName).join(', ');
    const directors = show.directors.edges.map(edge => edge.node.fullName).join(', ');

    return (
      <ParallaxView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={true}
        scrollEnabled={scrollEnabled}
        backgroundSource={{uri: show.banner}}
        windowHeight={470}
      >
        <View style={styles.content}>
          <View style={[styles.headerLine, this._getColorStyles().primaryBackground]} />
          <View style={styles.header}>
            <Text style={styles.title}>{show.title}</Text>
            <View style={styles.detail}>
              <Text style={styles.detailText}>{show.runtime}</Text>
              <Text style={styles.detailText}>{show.genre}</Text>
              <Text style={styles.detailText}>{show.year}</Text>
              <Text style={styles.detailText}>{show.rating}</Text>
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
            disableScroll={this._disableScroll.bind(this)}
            enableScroll={this._enableScroll.bind(this)}
          />
          <Text style={styles.description}>{show.description}</Text>
          <Text style={styles.description}>Directed by: {directors}</Text>
          <Text style={styles.description}>Starring {cast}</Text>
        </View>
      </ParallaxView>
    );
  }
}

export default Relay.createContainer(MovieDetailView, {
  fragments: {
    show: () => Relay.QL`
      fragment on Show {
        id
        title
        banner
        plot
        runtime
        genre
        year
        rating
        backgroundColor
        detailColor
        textColor
        directors(first: 3) {
          edges {
            node {
              fullName
            }
          }
        }
        cast(first: 3) {
          edges {
            node {
              fullName
            }
          }
        }
      }
    `,
  }
});

const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: '#B6AEA3',
      // TODO: should not be hard coded
      paddingBottom: 50,
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
      //paddingBottom: 30,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 14,
      fontWeight: '300'
    }
});
