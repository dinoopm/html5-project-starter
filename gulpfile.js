var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourceMaps = require('gulp-sourcemaps'),
    util = require('gulp-util'),
	clean = require('gulp-clean'),
	cssmin = require('gulp-cssmin'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass',['cleanstyles'], function() {
    return gulp.src('./assets/sass/main.scss')
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('cleanstyles', function () {
  return gulp.src('./assets/css/*.min.css', {read: false})
    .pipe(clean());
});

gulp.task('cleanjs', function () {
  return gulp.src('./assets/js/*.min.js', {read: false})
    .pipe(clean());
});

gulp.task('cssmin',['sass','autoprefixer'], function() {
    return gulp.src('./assets/css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('compress',['cleanjs'], function() {
  gulp.src('./assets/js/*.js')
    .pipe(minify({
        ext:{
            //src:'-debug.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['./assets/js/vendor/html5shiv.js', '-min.js']
    }))
    .pipe(gulp.dest('./assets/js/'))
});


gulp.task('autoprefixer', function () {
	return gulp.src('./assets/css/main.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./assets/css'));
});


gulp.task('watchsass', function() {
  gulp.watch('./assets/sass/*.scss',['cssmin']);
});

gulp.task('watchjs', function() {
  gulp.watch('./assets/js/*.js',['compress']);
});
	
	
gulp.task('default', ['cssmin','compress','watchsass','watchjs']);
