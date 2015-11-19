'use strict';

var React = require('react-native');
var {
  ActionSheetIOS,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKAccessToken,
  FBSDKGraphRequest,
} = FBSDKCore;

var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

var json = require("../Data");
var Avatar = require("../components/Avatar");

var Billboard = React.createClass({

  getInitialState: function() {
    return {
      userPic: "https://avatars0.githubusercontent.com/u/3099999?v=3&s=400",
    };
  },

  generateGroupImage: function() {
    return ({uri: this.props.groupMembers[0].picture});
  },

  _handleRequest(error, result) {
   if (!error) {
     var photos = result.data;
     var renderedPhotos = [];
     for (var i = 0, il = photos.length; i < il; i++) {
       var photo = photos[i];
       if (photo.images && photo.images.length > 0) {
         console.log(photo)
       }
     }
   }
 },

  render: function() {
    return (
      <View style={styles.container}>
      <Image
          source={{uri: this.state.userPic}}
          style={styles.image}
        />

      <Text onPress={this.props.showActionSheet} style={styles.filterSelect}>{this.props.filterName}</Text>
        <View style={styles.line} />
        <FBSDKLoginButton
          style={styles.loginButton}
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                alert('Logged in.');
                FBSDKAccessToken.getCurrentAccessToken((token) => {
                  var fetchProfileRequest = new FBSDKGraphRequest((error, result) => {
                    if (error) {
                      alert('Error making request.');
                    } else {
                      this.setState({
                        userPic: result.picture.data.url,
                      });
                    }
                    }, 'me',
                    {
                      fields: { string: 'picture.type(large)' },
                    }
                  );
                  // Start the graph request.
                  fetchProfileRequest.start();
                })
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={[]}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // center
      height: 190,
    },
    line: {
      marginTop: 10,
      width: 350,
      height: 1,
      backgroundColor: '#F1F1F1'
    },
    filterSelect: {
      color: '#0066FA',
      fontSize: 18,
      marginTop:15,
    },
    image: {
      marginTop: 15,
      width: 125,
      height: 125,
      borderRadius: 125/2,
    },
});

module.exports = Billboard;
