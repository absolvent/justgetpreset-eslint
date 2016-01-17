# gore-eslint

Wrapper around eslint for ease of use and zero configuration.

# usage

You can easily attach eslint checker to your gulpfile.
Internally, [airbnb](https://github.com/airbnb/javascript) eslint config
(slightly modified to achieve compatibility with React Native and Node.js) is
used.

```JavaScript
const gulp = require('gulp');
const eslint = require('gore-eslint');

gulp.task('lint', function gulpLintTask() {
  return eslint([
    __filename,
    'index.android.js',
    'index.ios.js',
    'ios_modules/**/*.js',
  ]);
});
```
