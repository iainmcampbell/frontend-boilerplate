// npm install --save-dev gulp gulp-util gulp-plumber gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-livereload tiny-lr

var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload   = require('gulp-livereload');
var sourcemaps   = require('gulp-sourcemaps');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');

gulp.task('styles', function() {
 return gulp.src('src/sass/style.sass' )
   .pipe(plumber())
   .pipe(sourcemaps.init())
   .pipe(sass({
     style: 'compressed',
     indentedSyntax: true,
     errLogToConsole: true
   }))
   .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest( 'src/css' ))
});

gulp.task('scripts', function(){
  var b = browserify({ debug: true })

  return b.bundle()
    .pipe(source('./src/js/main.js'))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps:true}))
      .pipe(uglify())
    .pipe(rename('src/js/min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', function() {

  livereload.listen();

  gulp.watch('src/sass/**/*.sass', ['styles']);
  gulp.watch('src/js/**/*', ['scripts']);

  gulp.watch('src/js/min.js', livereload.changed);
  gulp.watch('src/**/*.html', livereload.changed);
  gulp.watch('src/css/*.css', livereload.changed);

});