/**
 * Copyright (c) 2016-present, spacekick
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const args = Array.from(process.argv).slice(2);

const CLIEngine = require(args.shift()).CLIEngine;
const eslintPluginReact = require(args.shift());

const eslint = new CLIEngine(JSON.parse(args.shift()));

eslint.addPlugin('react', eslintPluginReact);

process.send(eslint.executeOnFiles(args));
