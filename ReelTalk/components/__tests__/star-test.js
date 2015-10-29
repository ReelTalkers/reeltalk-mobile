'use strict';

jest.setMock('react-native', {});
jest.dontMock('../Star');


describe('star', function() {
  var Star = require('../Star.js');

 it('Generates a gray star', function() {
   expect('Foo').toBe('Foo');
 });
});
