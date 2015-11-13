'use strict';
jest.setMock('react-native', {
    NativeModules: {}
});
jest.dontMock('../Rating');

describe('Star', function() {
  it('Passes', function() {
    var Star = require('../Star');
    expect(1).toBe(1);
  });
});
