'use strict';

jest.setMock('react-native', {});
jest.dontMock('../Rating');

describe('rating', function() {
  var rating = require('../Rating');

 it('Gets correct colors for a score of 0', function() {
   expect(rating._get_stars(0)).toBe([{color: 'gray'}, {color: 'gray'}, {color: 'gray'}, {color: 'gray'}, {color: 'gray'}]);
 });

 it('Gets correct colors for a score of 1', function() {
   expect(rating._get_stars(1)).toBe([{color: 'gold'}, {color: 'gray'}, {color: 'gray'}, {color: 'gray'}, {color: 'gray'}]);
 });

 it('Gets correct colors for a score of 2', function() {
   expect(rating._get_stars(2)).toBe([{color: 'gold'}, {color: 'gold'}, {color: 'gray'}, {color: 'gray'}, {color: 'gray'}]);
 });

 it('Gets correct colors for a score of 3', function() {
   expect(rating._get_stars(3)).toBe([{color: 'gold'}, {color: 'gold'}, {color: 'gold'}, {color: 'gray'}, {color: 'gray'}]);
 });

 it('Gets correct colors for a score of 4', function() {
   expect(rating._get_stars(4)).toBe([{color: 'gold'}, {color: 'gold'}, {color: 'gold'}, {color: 'gold'}, {color: 'gray'}]);
 });

 it('Gets correct colors for a score of 5', function() {
   expect(rating._get_stars(5)).toBe([{color: 'gold'}, {color: 'gold'}, {color: 'gold'}, {color: 'gold'}, {color: 'gold'}]);
 });

});
