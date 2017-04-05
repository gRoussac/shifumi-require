const gulp = require('gulp'),
      mocha = require('gulp-mocha');
      stripCode = require('gulp-strip-code'),
      runSequence = require('run-sequence');
      gutil = require('gulp-util');
      public_flag = ':public';

gulp.task('default', ['test']);

gulp.task('test', function() {
  return gulp.src(['test/test_*.js'], { read: false })
    .pipe(mocha({
      reporter: 'progress',
      globals: {
        should: require('chai')
      }
    }));
});

gulp.task('test' + public_flag, function() {
  return gulp.src(['test/test_*.js'], { read: false })
    .pipe(mocha({
      grep: public_flag,
      reporter: 'progress',
      globals: {
        should: require('chai')
      }
    }));
});

gulp.task('watch', function() {
  gulp.watch(['scripts/**', 'test/**'], ['mocha']);
});

gulp.task('build', ['test', 'dist'], function(callback) {
  runSequence('stripCode', 'test' + public_flag, function() {
      callback();
  });
});

gulp.task('dist', function () {
     gulp
      .src('scripts/*.js')
      .pipe(gulp.dest('dist'));
});

gulp.task('stripCode', function(){
  gulp.src('dist/*.js')
    .pipe(stripCode({
      start_comment: "start-test-code",
      end_comment: "end-test-code"
    }))
    .pipe(gulp.dest('dist'));
});

// gulp.task('uglify', function() {
//   var options = {};
//   return gulp.src('dist/*.js')
//   .pipe(minifier(options, uglifyjs).on('error', function(err) {
//     gutil.log(gutil.colors.red('[Error]'), err.toString());
//     this.emit('end');
//   }))
//   .pipe(gulp.dest('dist/bundle'));
// });