'use strict';

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('default', ['build']);

gulp.task('build', function(done) {
  runSequence('clean', ['build-browser'], done);
});

gulp.task('build-browser', [], function() {
  gulp.src('index.js')
      .pipe(plugins.webpack({
        output: {
          library: 'StellarWallet'
        }
      }))
      //.pipe(plugins.uglify())
      .pipe(plugins.rename('stellar-wallet.js'))
      .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return gulp.src('build', { read: false })
      .pipe(plugins.rimraf());
});

gulp.task('watch', ['build'], function() {
  gulp.watch('lib/**/*', ['build']);
});