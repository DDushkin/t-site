var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  pug = require('gulp-pug'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');


gulp.task('sass', function(){
  return gulp.src('dev/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function(){
  return gulp.src('dev/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dev/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src('dev/js/main.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dev/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'dev'
    },
    notify: false
  });
});


gulp.task('watch', ['browser-sync', 'pug', 'sass', 'js'], function (){
  gulp.watch('dev/sass/*.scss', ['sass']);
  gulp.watch('dev/pug/**/*.pug', ['pug']);
  gulp.watch('dev/js/*.js', ['js']);
});
