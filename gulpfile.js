var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
 
var tsProject = ts.createProject('source-test/tsconfig.json', {
  noExternalResolve: false
});
 
gulp.task('scripts', function() {
  var tsResult = gulp.src(['source-test/**/*.ts', 'typings/main/**/*.d.ts', 'typings_custom/**/*.d.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));
 
  return tsResult.js
    .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file 
    .pipe(gulp.dest('build-source-test'));
});

gulp.task('watch', ['scripts'], function() {
  gulp.watch('source-test/**/*.ts', ['scripts']);
});
