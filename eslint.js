/**
 * Copyright (c) 2015-present, spacekick
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  parser: require.resolve('babel-eslint'),
  extends: require.resolve('eslint-config-airbnb'),
  rules: {
    'func-names': 0,
    'prefer-arrow-callback': 0,
    strict: 0,
  },
};
