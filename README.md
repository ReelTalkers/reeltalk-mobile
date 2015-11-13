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

For the time being until a more permanent solution is achieved, change two lines of `RCTScrollView.m`.

`CGFloat const ZINDEX_DEFAULT = 1; // Andrew Hamm Changed from 0
CGFloat const ZINDEX_STICKY_HEADER = 0; // Andrew Hamm Changed from 50`
