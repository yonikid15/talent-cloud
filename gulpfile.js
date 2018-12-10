const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Sass task
gulp.task('sass', function() {
  return gulp.src(['src/scss/styles.scss'])
    .pipe(sass())
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

/* .on('error', function() {...}) 

    This 'on' function checks to see if this gulp task crashes due to any incorect syntax. It then makes sure it doesn't end the gulp task immediately, but instead continue running (this.emit('end')) by 'telling' gulp eveything ran smoothly
    
*/

// Browsersync watch task
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    notify: false,
    server: './dist'
  });

  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['dist/index.html']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve']);