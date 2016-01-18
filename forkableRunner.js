/**
 * Copyright (c) 2016-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const CLIEngine = require('eslint').CLIEngine;
const eslintPluginReact = require('eslint-plugin-react');

const args = Array.from(process.argv).slice(2);
const configFile = args.shift();
const eslint = new CLIEngine({
  configFile,
});

eslint.addPlugin('react', eslintPluginReact);

process.send(eslint.executeOnFiles(args));
