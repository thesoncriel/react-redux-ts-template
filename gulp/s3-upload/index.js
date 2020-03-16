'use strict'

const gulp = require('gulp');
const awspublish = require('gulp-awspublish');
const rename = require('gulp-rename');
// const cloudfront = require('gulp-cloudfront');
// const awsKey = require('../../aws.key');

const pkg = require('../../package.json');
const Properties = require('../docker/Properties');

const envConfig = new Properties('.env');
const accessKeyId = envConfig.get('AWS_ACCESS_KEY_ID');
const secretAccessKey = envConfig.get('AWS_SECRET_KEY');
const awsRegion = envConfig.get('AWS_REGION');
const awsConfigTest = {
  bucket: envConfig.get('AWS_S3_TEST_BUCKET'),
  distributionId: envConfig.get('AWS_SE_TEST_DISTRIBUTION_ID'),
};
const awsConfigProd = {
  bucket: envConfig.get('AWS_S3_PRODUCTION_BUCKET'),
  distributionId: envConfig.get('AWS_SE_PRODUCTION_DISTRIBUTION_ID'),
};

// console.log(`'${accessKeyId}'`);
// console.log(`'${secretAccessKey}'`);

const awsConfig = {
  region: awsRegion,
  test: awsConfigTest,
  prod: awsConfigProd
};

// const configDeploy = {
//   src: [
//     './.next/static/**/*',
//     '!./**/*.js.map',
//     '!./.next/static/development/**/*',
//     '!./.next/static/webpack/**/*',
//   ],
//   base: '/_wstatic/waiting/_next/static/',
// };

const upload = conf => (env, noCache = false) => {
  const aws = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: awsConfig.region,
    distributionId: awsConfig[env].distributionId,
    params: {
      Bucket: awsConfig[env].bucket
    }
  };

  // console.log(aws);

  const publisher = awspublish.create(aws);
  const maxAge = env === 'test' ? 0 : 86400;
  const normalHeaders = {
    'Cache-Control': 'max-age=' + maxAge + ', no-transform, public, no-cache',
    // edge cache 를 통해서만 접근 하도록 한다.
    'x-amz-acl': 'private',
  };

  const noCacheHeaders = {
    'Cache-Control': 'max-age=0 , no-transform, public, no-cache, no-store, must-revalidate',
    // edge cache 를 통해서만 접근 하도록 한다.
    'x-amz-acl': 'private',
  };

  const headers = noCache ? noCacheHeaders : normalHeaders;

  // gulp.task('publishAll', function() {
  //   return gulp.src([
  //     './.next/static/**/*'
  //     ,'!./.next/static/development/**/*',
  //     ,'!./.next/static/webpack/**/*'
  //   ])
  //   .pipe(rename(function(path) {
  //     path.dirname = '/_wstatic/waiting/_next/' + path.dirname;
  //   }))
  //   .pipe(awspublish.gzip())
  //   .pipe(publisher.publish(headers))
  //   .pipe(awspublish.reporter())
  //   // .pipe(cloudfront(aws));
  // });

  // gulp.task('awsUpload', function() {
  //    return gulp.src( [
  //       './dist/index.html'
  //    ])
  //    .pipe(awspublish.gzip())
  //    .pipe(publisher.publish(indexHeaders, { force: true })) // 캐쉬 무시 및 강제 업데이트
  //    .pipe(awspublish.reporter())
  //    .pipe(cloudfront(aws));
  // });

  // return gulp.start('publishAll');
  return gulp.src(conf.src)
    .pipe(rename(function (path) {
      // 빌드되면 항상 앞에 _next/static/ 경로를 찾으므로 붙여 주어야 한다.
      path.dirname = conf.base + path.dirname;
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers, {
      force: noCache,

    }))
    .pipe(awspublish.reporter());
};

// const basePath = '/_wstatic/waiting';
const basePath = '';

const nextUpload = upload({
  src: [
    './.next/static/**/*',
    '!./**/*.js.map',
    '!./.next/static/development/**/*',
    '!./.next/static/webpack/**/*',
  ],
  base: basePath + `${pkg.version}/_next/static/`,
});

const spriteUpload = upload({
  src: [
    './static/sprite/*',
    '!./static/sprite/*test*'
  ],
  base: basePath + `${pkg.version}/sprite/`
});

gulp.task('nextUpload:test', function () {
  return nextUpload('test');
});
gulp.task('nextUpload:prod', function () {
  return nextUpload('prod');
});

gulp.task('spriteUpload:test', function () {
  return spriteUpload('test');
});
gulp.task('spriteUpload:prod', function () {
  return spriteUpload('prod');
});

const fontsUpload = upload({
  src: [
    './static/fonts/**/*',
  ],
  base: basePath + '/fonts/'
});

gulp.task('fontsUpload:test', () => fontsUpload('test'));
gulp.task('fontsUpload:prod', () => fontsUpload('prod'));

const rootUpload = upload({
  src: [
    './static/favicon.ico',
    './static/favicon.png',
  ],
  base: basePath,
});

gulp.task('rootUpload:test', () => rootUpload('test'));
gulp.task('rootUpload:prod', () => rootUpload('prod'));

const imagesUpload = upload({
  src: [
    './static/images/**/*',
  ],
  base: basePath + `${pkg.version}/images/`
});

gulp.task('imagesUpload:test', () => imagesUpload('test'));
gulp.task('imagesUpload:prod', () => imagesUpload('prod'));

const jsonDataUpload = upload({
  src: [
    './static/data/**/*',
  ],
  base: basePath + `${pkg.version}/data/`
});
gulp.task('jsonData:test', () => jsonDataUpload('test', true));
gulp.task('jsonData:prod', () => jsonDataUpload('prod', true));

gulp.task('next:test', gulp.series(['nextUpload:test', 'spriteUpload:test', 'fontsUpload:test', 'imagesUpload:test', 'jsonData:test', 'rootUpload:test']));
gulp.task('next:prod', gulp.series(['nextUpload:prod', 'spriteUpload:prod', 'fontsUpload:prod', 'imagesUpload:prod', 'jsonData:prod', 'rootUpload:prod']));

// const bannerDataUpload = upload({
//   src: [
//     './static/data/waitings-banner.json',
//   ],
//   base: basePath + '/data/'
// });

// const bannerImageUpload = upload({
//   src: [
//     './static/banners/*',
//   ],
//   base: basePath + '/banners/'
// });

// gulp.task('bannerDataUpload:test', () =>  return bannerDataUpload('test', true);/ }));
// gulp.task('bannerDataUpload:prod', () =>  return bannerDataUpload('prod', true);/ }));
// gulp.task('bannerImageUpload:test', () =>  return bannerImageUpload('test');/ }));
// gulp.task('bannerImageUpload:prod', () =>  return bannerImageUpload('prod');/ }));

// gulp.task('banner:test', gulp.series(['bannerDataUpload:test', 'bannerImageUpload:test']));
// gulp.task('banner:prod', gulp.series(['bannerDataUpload:prod', 'bannerImageUpload:prod']));



// const imagesUpload = upload({
//   src: [
//     './static/images/**/*',
//   ],
//   base: basePath + '/images/'
// });
// const tinyIconUpload = upload({
//   src: [
//     './static/tinyIcon/**/*',
//   ],
//   base: basePath + '/tinyIcon/'
// });

// gulp.task('imagesUpload:test', () =>  return imagesUpload('test');/ }));
// gulp.task('imagesUpload:prod', () =>  return imagesUpload('prod');/ }));
// gulp.task('tinyIconUpload:test', () =>  return tinyIconUpload('test');/ }));
// gulp.task('tinyIconUpload:prod', () =>  return tinyIconUpload('prod');/ }));

// gulp.task('images:test', gulp.series(['imagesUpload:test', 'tinyIconUpload:test']));
// gulp.task('images:prod', gulp.series(['imagesUpload:prod', 'tinyIconUpload:prod']));


// const jsonDataUpload = upload({
//   src: [
//     './static/data/**/*',
//     '!./static/data/waitings-banner.json',
//   ],
//   base: basePath + '/data/'
// });
// const ClaimSchemaUpload = upload({
//   src: [
//     './static/claim-schema/**/*',
//     '!./static/claim-schema/**/*.sample.*',
//   ],
//   base: basePath + '/claim-schema/'
// });

// gulp.task('jsonData:test', () =>  return jsonDataUpload('test', true);/ }));
// gulp.task('jsonData:prod', () =>  return jsonDataUpload('prod', true);/ }));
// gulp.task('claimSchema:test', () =>  return ClaimSchemaUpload('test', true);/ }));
// gulp.task('claimSchema:prod', () =>  return ClaimSchemaUpload('prod', true);/ }));

// gulp.task('data:test', gulp.series(['jsonData:test', 'claimSchema:test']));
// gulp.task('data:prod', gulp.series(['jsonData:prod', 'claimSchema:prod']));