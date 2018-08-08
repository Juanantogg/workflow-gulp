'use strict';

const gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel'),
  concat =  require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  browsersync = require('browser-sync').create();
  // babel-core
  // babel-preset-env
  // npm i --save-dev gulp gulp-pug gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-babel gulp-concat gulp-imagemin browser-sync babel-core babel-preset-env

gulp.task('html', () => {
  return gulp.src('dev/views/index.pug')
    .pipe(pug({
      //pretty: true
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('css', () => {
  return gulp.src('./dev/sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest('./assets/css/'))
});

gulp.task('js', () => {
  return gulp.src('./dev/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({presets:['env'], minified: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/js/'))
});

gulp.task('img', () => {
  return gulp.src('dev/img/*')
    .pipe(imagemin({
      intelaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: true}]
    }))
    .pipe(gulp.dest('./assets/img/'))
});

gulp.task('default', ['html', 'css', 'js'], () => {
  browsersync.init({server: './'});
  gulp.watch('dev/views/**/*.pug', ['html']).on('change', browsersync.reload);
  gulp.watch('dev/sass/**/*.sass', ['css']).on('change', browsersync.reload);
  gulp.watch('dev/js/**/*.js', ['js']).on('change', browsersync.reload);
});
