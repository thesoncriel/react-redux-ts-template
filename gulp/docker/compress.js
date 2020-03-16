const _ = require('lodash');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const constant = require('./constant');

const plugins = gulpLoadPlugins();

/**
 * 10보다 작은 숫자앞에 0 패딩
 * @param {Number} num  - Target Number
 * @returns {String}
 */
function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * 현재 시간 스트링 작성
 * @param {Date} now  - 현재 Date Object
 * @returns {String}
 */
function getTimestamp(now) {
  let clonedNow = _.cloneDeep(now);

  if (!(clonedNow instanceof Date)) {
    clonedNow = new Date();
  }

  const date = clonedNow.getFullYear()
    + padZero(clonedNow.getMonth() + 1)
    + padZero(clonedNow.getDate());

  const time = padZero(clonedNow.getHours())
    + padZero(clonedNow.getMinutes())
    + padZero(clonedNow.getSeconds());

  return `${date}_${time}`;
}

/**
 * 배포 파일 압축
 * @returns {*|void|*|*}
 */
const compressDist = () => {
  // zip 파일명 작성
  const filename = `${constant.pkg.name}_v${constant.pkg.version}_${getTimestamp(new Date())}.zip`;
  // 압축
  return gulp.src([`${constant.paths.dist}/**/*`], { dot: true })
    .pipe(plugins.zip(filename))
    .pipe(gulp.dest('./'));
};

/**
 * 도커용 배포 파일 압축
 * @returns {*|void|*|*}
 */
const compressDistForDocker = () => {
  // zip 파일명 작성
  const filename = `${constant.pkg.name}_v${constant.pkg.version}_${getTimestamp(new Date())}.zip`;
  const gulpSrc = [`${constant.paths.dist}/Dockerrun.aws.json`, `${constant.paths.dist}/.ebextensions/**`];

  // 압축
  return gulp.src(gulpSrc, { dot: true, base: 'dist' })
    .pipe(plugins.zip(filename))
    .pipe(gulp.dest('./'));
};

module.exports = {
  compressDist,
  compressDistForDocker,
};
