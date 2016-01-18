/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const childProcess = require('child_process');
const eslintResultsFormatter = require('eslint/lib/formatters/stylish');
const glob = require('ultra-glob');
const gutil = require('gulp-util');
const path = require('path');
const RxNode = require('rx-node');

const EMPIRICALLY_ACHIEVED_SUITABLE_BUFFER_SIZE = 50;

function normalizeOptions(options) {
  if (typeof options === 'object') {
    return options;
  }

  return {
    configFile: options || path.resolve(__dirname, 'eslint.js'),
  };
}

function runFiles(filesGlobPattern, options) {
  const runnerPath = path.resolve(__dirname, 'forkableRunner');
  const normalizedOptions = normalizeOptions(options);

  return RxNode.fromReadableStream(glob.readableStream(filesGlobPattern))
    .map(function (file) {
      return file.path;
    })
    .bufferWithCount(EMPIRICALLY_ACHIEVED_SUITABLE_BUFFER_SIZE)
    .flatMap(function (fileList) {
      return new Promise(function (resolve) {
        const childProcessHandle = childProcess.fork(runnerPath, fileList);

        childProcessHandle.send(normalizedOptions);
        childProcessHandle.on('message', resolve);
      });
    })
    .reduce(function (acc, results) {
      return {
        errorCount: acc.errorCount + results.errorCount,
        results: acc.results.concat(results.results),
        warningCount: acc.warningCount + results.warningCount,
      };
    }, {
      errorCount: 0,
      results: [],
      warningCount: 0,
    })
    .do(function (results) {
      if (results.errorCount || results.warningCount) {
        gutil.log(eslintResultsFormatter(results.results));
      }

      if (results.errorCount) {
        throw new gutil.PluginError({
          message: new Error('eslint detected errors'),
          plugin: 'gore-eslint',
        });
      }
    })
    .toPromise(Promise);
}

module.exports = runFiles;
