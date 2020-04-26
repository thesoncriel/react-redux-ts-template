/* eslint-disable global-require, import/no-dynamic-require */
const gulp = require('gulp');
const rename = require('gulp-rename');

// const gulpCopy = require('gulp-copy');
// const fs = require('fs');

const aEnvStr = [
  'dev',
  'test',
  'production'
];

aEnvStr.forEach(name => {
  gulp.task('cp:' + name, () => {
    return gulp
      .src('./environments/.env.' + name)
      .pipe(rename('.env'))
      .pipe(gulp.dest('./'));
  });
});



// 도커 베포
// require('./gulp/docker');

// CSS 스프라이트
require('./gulp/css-sprite');

// 정적파일 배포
// require('./gulp/s3-upload');
