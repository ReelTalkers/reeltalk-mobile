'use strict';

import React, {
  AppRegistry,
  ListView,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';

import MovieGrid from './MovieGrid';

class TopChartsHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: props.viewer.topWeek,
    };
  }

  _onValueChange(value) {
    const { viewer } = this.props;
    const newList = (value === 'Today') ? viewer.topToday : viewer.topWeek;
    this.setState({
      shows: newList,
    });
  }

  render() {
    return (
      <View>
        <SegmentedControlIOS
          values={["This Week", "Today"]}
          selectedIndex={0}
          onValueChange={(value) => this._onValueChange(value)}
        />
        <MovieGrid
          shows={this.state.shows}
          navigator={this.props.navigator}
        />
      </View>
    );
  }
}

export default Relay.createContainer(TopChartsHome, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        topWeek: allShows(first: 10) {
          ${MovieGrid.getFragment('shows')}
        }
        topToday: allShows(last: 5) {
          ${MovieGrid.getFragment('shows')}
        }
      }
    `
  }
})

const styles = StyleSheet.create({
});
