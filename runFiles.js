/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const CLIEngine = require('eslint').CLIEngine;
const eslintPluginReact = require('eslint-plugin-react');
const glob = require('ultra-glob');
const gutil = require('gulp-util');
const path = require('path');
const RxNode = require('rx-node');

const EMPIRICALLY_ACHIEVED_SUITABLE_BUFFER_SIZE = 20;

function runFiles(filesGlobPattern, configFile) {
  const eslint = new CLIEngine({
    configFile: configFile || path.resolve(__dirname, 'eslint.js'),
  });

  eslint.addPlugin('react', eslintPluginReact);

  return RxNode.fromReadableStream(glob.readableStream(filesGlobPattern))
    .map(function (file) {
      return file.path;
    })
    .bufferWithCount(EMPIRICALLY_ACHIEVED_SUITABLE_BUFFER_SIZE)
    .map(function (fileList) {
      return eslint.executeOnFiles(fileList);
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
        gutil.log(eslint.getFormatter()(results.results));
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
