const gulp = require('gulp'),
      mocha = require('gulp-mocha');
      stripCode = require('gulp-strip-code'),
      runSequence = require('run-sequence');
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

gulp.task('test' + public_flag, ['stripCode'], function() {
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

gulp.task('build', ['default'], function(callback) {

  runSequence('test' + public_flag, function() {
    callback();
  });
});

gulp.task('stripCode', function(){
  gulp.src(['scripts/game.js'])
    .pipe(stripCode({
      start_comment: "start-test-code",
      end_comment: "end-test-code"
    }))
    .pipe(gulp.dest('dist'));
});