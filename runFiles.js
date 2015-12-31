/**
 * Copyright (c) 2015-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const CLIEngine = require('eslint').CLIEngine;
const glob = require('ultra-glob');
const gutil = require('gulp-util');
const path = require('path');
const Promise = require('bluebird');
const resolve = require('resolve');

function onLinterResultsReady(eslint, linterResults) {
  if (!linterResults) {
    return;
  }

  if (linterResults.errorCount || linterResults.warningCount) {
    gutil.log(eslint.getFormatter()(linterResults.results));
  }

  if (linterResults.errorCount) {
    throw new gutil.PluginError({
      message: new Error('eslint detected errors'),
      plugin: 'gore-eslint',
    });
  }
}

function onFileListReady(fileList) {
  const eslint = new CLIEngine({
    configFile: path.resolve(__dirname, 'eslint.js'),
  });

  return Promise.fromCallback(function resolveEslintPluginPromiseCallback(callback) {
    resolve('eslint-plugin-react', callback);
  }).then(function onEslintReactPluginReady(eslintReactPlugin) {
    eslint.addPlugin('react', require(eslintReactPlugin));

    return eslint.executeOnFiles(fileList);
  }).then(function onLinterResultsReadyPromiseWrapper(linterResults) {
    return onLinterResultsReady(eslint, linterResults);
  });
}

function runFiles(filesGlobPattern) {
  return glob(filesGlobPattern).then(onFileListReady);
}

module.exports = runFiles;
