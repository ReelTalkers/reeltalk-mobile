'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import Relay from 'react-relay';

import Billboard from './Billboard';
import Lolomo from './Lolomo';

class RecommendHome extends React.Component {
  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
          <Billboard user={this.props.user}/>
        </View>
        <Lolomo
          style={styles.lolomo}
          viewer={this.props.viewer}
          navigator={this.props.navigator}
          userId={this.props.userId}
        />
      </ScrollView>
    );
  }
}

export default Relay.createContainer(RecommendHome, {
  fragments: {
    user: () => Relay.QL`
      fragment on UserProfile {
        ${Billboard.getFragment('user')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on Query {
        ${Lolomo.getFragment('viewer')}
      }
    `
  }
});

const styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
  },
  lolomo: {
    flex: 1,
  },
});
