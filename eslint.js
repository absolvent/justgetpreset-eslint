/**
 * Copyright (c) 2015-present, lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  parser: require.resolve('babel-eslint'),
  extends: [
    'airbnb',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'import/no-unresolved': 0,
    strict: 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'no-prototype-builtins': 0,
    'react/forbid-prop-types': 0,
  },
};
