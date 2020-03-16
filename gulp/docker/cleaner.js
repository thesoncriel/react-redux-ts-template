const gulp = require('gulp');
const del = require('del');

/**
 * 임시 경로 정리
 * @returns {*}
 */
const cleanTemp = () => del(['.tmp'], { dot: true });

/**
 * 배포 경로 정리
 * @returns {*}
 */
const cleanDist = () => del(['dist'], { dot: true });

module.exports = {
  clean: gulp.parallel(cleanDist, cleanTemp),
  // clean: (cb) => {
  //   console.log('clean');
  //   const ret = gulp.parallel(cleanDist, cleanTemp);

  //   cb();

  //   return ret;
  // },
  cleanTemp,
  cleanDist,
};
