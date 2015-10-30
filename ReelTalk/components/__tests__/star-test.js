'use strict';

jest.setMock('react-native', {});
jest.dontMock('../Star');


describe('star', function() {
  var star = require('../Star');

 it('Generates a gray star', function() {
   expect(star._selectStar('gray')).toBe(<Image source={require('image!GrayStar')} />);
 });

 it('Generates a gold star', function() {
   expect(star._selectStar('gold')).toBe(<Image source={require('image!GoldStar')} />);
 });
});
