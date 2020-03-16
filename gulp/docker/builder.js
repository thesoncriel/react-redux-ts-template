const _ = require('lodash');
const gulp = require('gulp');
const constant = require('./constant');

const clean = require('./cleaner');

/**
 * 서버 배포 기타 파일 목록
 * @type {ReadonlyArray<string>}
 */
const SERVER_EXTRAS_FILES = Object.freeze([
  'package.json',
  'package-lock.json',
  '.dockerignore',
  'Dockerfile',
  'Dockerrun.aws.json',
  '.ebextensions/**',
  '.npmrc',
  '!.env',
  'buildspec.yml',
]);

/**
 * 기타 파일을 배포 폴더로 복사
 * @returns {*|void|*|*}
 */
const copyExtras = () => gulp.src(SERVER_EXTRAS_FILES, {
  dot: true,
  cwdbase: true,
  allowEmpty: true,
}).pipe(gulp.dest(constant.paths.dist));

/**
 * 서버 파일을 배포 폴더로 복사
 * @returns {*|void|*|*}
 */
const copyServer = () => {
  const src = _.union(constant.paths.server.views,
    constant.paths.server.scripts,
    constant.paths.server.json);
  return gulp.src(src, {
    dot: true,
    cwdbase: true,
  }).pipe(gulp.dest(constant.paths.dist));
};


/**
 * 클라이언트 Assets 복사
 * @returns {*|void|*|*}
 */
const copyClientAssets = () => gulp.src([
  constant.paths.client.assets,
  `!${constant.paths.client.bundleScript}`,
  `!${!constant.paths.client.bundleStyle}`,
  `!${!constant.paths.client.vendorScript}`,
], {
  dot: true,
  allowEmpty: true,
})
  .pipe(gulp.dest(`${constant.paths.dist}/${constant.publicPath}/assets`));

/**
 * 클라이언트 기타 파일 복사
 * @returns {*|void|*|*}
 */
const copyClientExtras = () => gulp.src(_.union([
  constant.paths.client.mainView,
  constant.paths.client.mainStyle,
  constant.paths.client.mainScript,
  `${constant.clientPath}/.htaccess`,
  `${constant.clientPath}/favicon.ico`,
  `${constant.clientPath}/robots.txt`,
]), {
  dot: true,
  allowEmpty: true,
})
  .pipe(gulp.dest(`${constant.paths.dist}/${constant.publicPath}`));

const copyNextSrc = () => gulp.src(_.union([
  constant.paths.next.builds,
  constant.paths.next.pages,
  constant.paths.next.src,
  constant.paths.next.assets,
  constant.paths.next.environments,
], constant.paths.next.configs), {
  dot: true,
  allowEmpty: true,
  cwdbase: true,
})
  .pipe(gulp.dest(constant.paths.dist));
/**
 * Client Build
 */
const buildClient = gulp.series(copyClientAssets, copyClientExtras, copyNextSrc);

/**
 * Server Build
 */
const buildServer = gulp.series(copyExtras, copyServer);

/**
 * Server Builder
 * @type {{buildServer: *, build: *, buildClient: *}}
 */
module.exports = {
  build: gulp.series(buildClient, buildServer),
  // build: () => {
  //   console.log('build');
  //   return gulp.series(buildClient, buildServer)
  // },
  buildClient,
  buildServer,
};
