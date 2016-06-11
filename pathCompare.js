/**
 * Copyright (c) 2016-present, lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const cup = require('common-urlpath-prefix');
const filter = require('lodash/filter');
const upath = require('upath');

function pathCompare(a, b) {
  const normalizedA = upath.normalize(a);
  const normalizedB = upath.normalize(b);
  const commonPart = filter(cup([normalizedA, normalizedB]).split('/'));
  const splitA = filter(normalizedA.split('/'));
  const splitB = filter(normalizedB.split('/'));

  if (splitA.length > splitB.length) {
    return -1;
  }

  if (splitB.length > splitA.length) {
    return 1;
  }

  const tailA = splitA.slice(commonPart.length);
  const tailB = splitB.slice(commonPart.length);

  for (let i = 0; i < tailA.length; i += 1) {
    const comparison = tailA[i].localeCompare(tailB[i]);

    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
}

module.exports = pathCompare;
