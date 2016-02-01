/**
 * Copyright (c) 2016-present, spacekick
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = function (inp, callback) {
  const CLIEngine = require(inp.resolvedEslint).CLIEngine;
  const eslintPluginReact = require(inp.resolvedEslintPluginReact);

  const eslint = new CLIEngine(inp.normalizedOptions);

  eslint.addPlugin('react', eslintPluginReact);

  callback(null, eslint.executeOnFiles(inp.fileList));
};
