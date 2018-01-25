var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  pugInheritance = require('gulp-pug-inheritance'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  pug = require('gulp-pug'),
  sourcemaps = require('gulp-sourcemaps'),
  gcmq = require('gulp-group-css-media-queries'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  smartgrid = require('smart-grid'),
  cached = require('gulp-cached'),
  changed = require('gulp-changed');

//smartgrid options
var sgsettings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1320px', /* max-width оn very large screen */
        fields: '0px' /* side fields */
    },
    // breakPoints: {
    //     lg: {
    //         width: '1100px', /* -> @media (max-width: 1100px) */
    //     },
    //     md: {
    //         width: '960px'
    //     },
    //     sm: {
    //         width: '780px',
    //         fields: '15px' /* set fields only if you want to change container.fields */
    //     },
    //     xs: {
    //         width: '560px'
    //     }
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    //}
};

gulp.task('sass', function(){
  return gulp.src([
          '!dev/sass/smart-grid.scss',
          'dev/sass/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    // .pipe(gcmq()) //TODO: enable for dest version
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function(){
  return gulp.src('dev/pug/*.pug')
    // .pipe(pugInheritance({basedir: '/dev/'}))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dev/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug-pages', function() {
  return gulp.src([
    '!dev/pug/partials/*.pug',
    'dev/pug/**/*.pug'
  ])
    .pipe(changed('./', {
      extension: '.html'
    }))
    .pipe(cached('pug'))
    .pipe(pugInheritance({
      basedir: 'dev/pug',
      skip: 'node_modules'
    }))
    .pipe(pug({
      locals: {},
      pretty: true
    }))
    .pipe(gulp.dest('dev/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src('dev/js/main.js')
    .pipe(uglify().on('error', function(e){
        console.log(e);
     }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dev/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'dev'
    },
    notify: false,
    open: false
  });
});

// regenerate smartgrid file
gulp.task('grid', function(){
  smartgrid('dev/sass', sgsettings);
});


gulp.task('watch', ['browser-sync', 'pug', 'sass', 'js'], function (){
  global.watch = true;
  gulp.watch('dev/sass/*.scss', ['sass']);
  gulp.watch('dev/pug/**/*.pug', ['pug-pages']);
  gulp.watch('dev/js/*.js', ['js']);
});

gulp.task('default', ['watch']);
