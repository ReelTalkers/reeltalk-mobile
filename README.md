# reeltalk mobile
mobile native implementation of ReelTalk

## Running this app

Before running the app, make sure you ran:

    cd ReelTalk
    npm install

Targeted platforms:
  - iOS
  - Android

## React Native Modifications

For the time being until a more permanent solution is achieved, change the content style in `react-native-parallax-view/lib/ParralxView.js`.

    content: {
        flex: 1,
        flexDirection: 'column'
    }
