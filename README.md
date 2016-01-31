# space-preconfigured-eslint

Wrapper around eslint for ease of use and zero configuration. This package
is preconfigured to use [airbnb](https://github.com/airbnb/javascript) eslint
config (slightly modified to achieve compatibility with React Native and
Node.js).

This linter also works great with bigger projects because it splits linter into
several child processes and distributes lint files evenly between them.
It makes use of most of your processor cores probably. :)

# usage

You can easily attach eslint checker to your gulpfile.

```JavaScript
const gulp = require('gulp');
const eslint = require('space-preconfigured-eslint');

gulp.task('lint', function gulpLintTask() {
  return eslint([
    __filename,
    'index.android.js',
    'index.ios.js',
    'ios_modules/**/*.js',
  ]);
});
```
