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

  render: function() {
    return (
      <TouchableHighlight style={styles.container} onPress={()=>console.log("Row pressed")}>
        <View style={styles.horizontal}>
          <Image
              source={{uri: this.props.user.picture}}
              style={styles.image}
          />
          <View style={styles.displayData}>
            <Text>{this.props.user.name}</Text>
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
