'use strict';

var gulp = require('gulp');
var paths = require('./support').paths;
var gutil = require('gulp-util');
var config = require('./config');

// Serve =======================================================================

gulp.task('serve', ['build'], function () {
  var connect = require('gulp-connect');

  connect.server({
    livereload : !gutil.env.production,
    root       : paths.dist,
    port       : config.WEB_SERVER_PORT,
  });

  if (!gutil.env.production) {
    var watch = require('gulp-watch');

    gulp.watch(paths.stylesheets, [ 'build:stylesheets' ]);
    gulp.watch(paths.javascripts, [ 'build:javascripts' ]);
    gulp.watch(paths.templates,   [ 'build:javascripts:templates' ]);
    gulp.watch(paths.statics,     [ 'build:statics' ]);
    gulp.watch(paths.index,       [ 'build:inject:index' ]);

    watch({ glob: paths.dist + '/**/*' }).pipe(connect.reload());
  }
});

// Serve Dist ==================================================================

gulp.task('serve:dist', function () {
  gutil.env.production = true;
  gulp.start('serve');
});
