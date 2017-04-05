const gulp = require('gulp'),
      mocha = require('gulp-mocha');
      stripCode = require('gulp-strip-code');
      public_flag = ':public';

gulp.task('default', ['test']);

gulp.task('test', function() {
  return gulp.src(['test/test_*.js'], { read: false })
    .pipe(mocha({
      reporter: 'landing',
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

gulp.task('build', ['default', 'stripCode', 'test' + public_flag], function() {

});

gulp.task('stripCode', function(){
  gulp.src(['scripts/game.js'])
    .pipe(stripCode({
      start_comment: "start-test-code",
      end_comment: "end-test-code"
    }))
    .pipe(gulp.dest('dist'));
});