'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var UserRow = React.createClass({

  getInitialState: function() {
    return {
      selected: false,
    };
  },

  render: function() {
    const { user, onSelectUser, onDeselectUser } = this.props;
    return (
      <TouchableHighlight style={styles.container} onPress={()=>{
          this.state.selected ? onDeselectUser(user) : onSelectUser(user);
          this.setState({
            selected: !this.state.selected,
          })
        }}>
      <View style={{
      backgroundColor: this.state.selected ? 'green' : 'white',
    }}>
        <View style={styles.horizontal}>
          <Image
              source={{uri: user.picture}}
              style={styles.image}
          />
          <View style={styles.displayData}>
              <Text>{user.name}</Text>
          </View>
        </View>
      </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
  },
  displayData: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: 10,
    borderRadius: 70/2,
  },
});

module.exports = UserRow;
