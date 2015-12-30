/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const runFiles = require('./runFiles');

gulp.task('test', function gulpTestTask() {
  return runFiles('./*.js');
});
