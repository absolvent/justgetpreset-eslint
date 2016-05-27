# lookly-preset-eslint

Wrapper around eslint for ease of use and zero configuration. This package
is preconfigured to use [airbnb](https://github.com/airbnb/javascript) eslint
config (slightly modified to achieve compatibility with React Native and
Node.js).

## performance gains over default eslint config

This linter also works great with bigger projects because it splits linter into
several child processes and distributes lint files evenly between them.
It makes use of all of your processor cores. :)

`lookly-preset-eslint` was tested on a project with 188 JavaScript files.

* On 2.8GHz Intel Core i7 and SSD storage overall linting time decreased from
`5s` to `2s`.
* On 1.3GHz Intel Core i3 and HDD storage overall linting time fell down from
`18s` to `12s`.

...so you should expect at least a several seconds speedup in project build
time.

## usage

You can easily attach eslint checker to your gulpfile.

```JavaScript
const gulp = require('gulp');
const eslint = require('lookly-preset-eslint');

gulp.task('lint', function gulpLintTask() {
  return eslint([
    __filename,
    'index.android.js',
    'index.ios.js',
    'ios_modules/**/*.js',
  ]);
});
```
