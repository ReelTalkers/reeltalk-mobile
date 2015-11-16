'use strict';

import React, {
  AppRegistry,
  ListView,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import json from "../Data";
import MovieGrid from "./MovieGrid";

export default class TopChartsHome extends React.Component {
  constructor() {
    super();
    this.state = {
      shows: json.categories[0]["shows"],
    };
  }

  _onValueChange(value) {
    const newList = (value === 'Today') ? json.categories[0]["shows"] : json.categories[1]["shows"];
    this.setState({
      shows: newList,
    });
  }

  render() {
    return (
      <View>
        <SegmentedControlIOS
          values={["This Week", "Today"]}
          selectedIndex={1}
          onValueChange={this._onValueChange}
        />
        <MovieGrid
          shows={this.state.shows}
          navigator={this.props.navigator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
