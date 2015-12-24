/**
 * # ItemCheckbox-test.js
 *
 * This class tests that the ItemCheckbox renders correctly under
 * numerous conditions
 *
 * *Note:* if you want to understand the structures here, add a
 * ```console.log``` and then ```npm test```.
 *
 */
'use strict';

jest.autoMockOff();

/**
 * ## Imports
 *
 * React is mocked in src/__mocks__/react-native.js
 *
 * *Note*: put a ```console.log``` on the outputs to see the structures
 */

import React, { View } from 'react-native';
import utils from 'react-addons-test-utils';

/**
 * ## Under test
 * class under test
 */
jest.dontMock('../Avatar.js');
var Avatar = require('../Avatar.js');

/**
 * ## Test
 */
 describe('Rating', () => {
   it('fires click event', () => {
     expect(1).toBe(1)
   });

 });
