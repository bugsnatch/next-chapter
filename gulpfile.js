'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var minify = require('gulp-minify');
var rename = require('gulp-rename');

// compile scss to css
gulp.task('sass', function () {
  return gulp.src('./sass/styles.scss')
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError))
    .pipe(rename({ basename: 'styles.min' }))
    .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
  return gulp.src('./js/scripts.js')
    .pipe(minify())
    .pipe(rename({ basename: 'scripts.min' }))
    .pipe(gulp.dest('./js'));
});

gulp.task('move', function () {
  var filesToMove = [
    'index.html',
    'manifest.json',
    'js/vendor/*',
    'js/*min*',
    'img/**',
    'css/*',
    'fonts/*',
    'node_modules/waypoints/lib/jquery.waypoints.min.js',
    'node_modules/animate.css/animate.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/font-awesome/fonts/fontawesome-webfont*',
    '*png',
    '*svg'
  ];

  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  return gulp.src(filesToMove, { base: './' })
    .pipe(gulp.dest('dist'));
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js', 'move'));
