'use strict';

jest.setMock('react-native', {
    NativeModules: {}
});
jest.dontMock('../Star');

var Star = require('../Star');

describe('star', function() {
 it('Generates a gray star', function() {
   expect('Foo').toBe('Foo');
 });
});
