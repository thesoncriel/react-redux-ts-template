const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const grunt = require('grunt');

const cleaner = require('./cleaner');
const builder = require('./builder');
const docker = require('./docker');
const compress = require('./compress');

const Properties = require('./Properties');
const constant = require('./constant');

const envConfig = new Properties('.env');

/**
 * grunt 설정
 */
require('jit-grunt')(grunt, {
  ebtdeploy: 'grunt-ebtdeploy',
});

/**
 * Beanstalk 컨픽 설정
 * @returns {Object}
 */
function getBeanstalkConfig() {
  return {
    accessKeyId: envConfig.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: envConfig.get('AWS_SECRET_KEY'),
    applicationName: envConfig.get('AWS_EB_APPLICATION_NAME'),
    region: envConfig.get('AWS_REGION'),
    sourceBundle: '',
    versionLabel: '',
    versionDescription: '',
    healthPage: envConfig.get('HEALTH_CHECK_URL'),
    s3: {
      bucket: 'elasticbeanstalk-ap-northeast-2-982190745434',
    },
  };
}

/**
 * grunt-eb-deploy 컨픽 설정
 * @param {String}  filename  - 파일명
 * @param {Object}  environment - 환경 설정
 */
const setGruntEb = (filename, environment) => {
  const fullEnvironmentName = grunt.config
    .get(`awsebtdeploy.${environment}.options.environmentName`);
  const description = `Deploy to ${fullEnvironmentName} environment on ${new Date()}.`;
  grunt.config.set('awsebtdeploy.options.sourceBundle', `./${filename}`);
  // 버전명 := 파일명에서 .zip 제외
  grunt.config.set('awsebtdeploy.options.versionLabel',
    filename.substring(0, filename.length - 4));
  grunt.config.set('awsebtdeploy.options.versionDescription', description);
};

/**
 * grunt 초기화
 */
grunt.initConfig({
  awsebtdeploy: {
    options: getBeanstalkConfig(),
    prod: {
      options: {
        environmentName: envConfig.get('AWS_EB_PRODUCTION_ENVIRONMENT_NAME'),
      },
    },
    test: {
      options: {
        environmentName: envConfig.get('AWS_EB_TEST_ENVIRONMENT_NAME'),
      },
    },
  },
});

/**
 * 압축 파일명 요청
 * @returns {String}
 */
const getLatestApplicationArchiveFileName = () => {
  const rootDir = fs.readdirSync(path.normalize(`${__dirname}/../../`));
  return rootDir
    .filter(file => file.indexOf('.zip') !== -1 && file.indexOf(constant.pkg.version) !== -1)
    .sort((a, b) => (a < b ? 1 : -1))[0];
};

/**
 * Upload Elastic Beanstalk
 * @param {String}  stage - 배포 환경
 * @returns {Function}
 */
const upload = stage => (cb) => {
  if (stage === 'production') stage = 'prod';

  const fileName = getLatestApplicationArchiveFileName();
  setGruntEb(fileName, stage);
  grunt.tasks([`awsebtdeploy:${stage}`], { gruntfile: false }, cb);
};

/**
 * 서버 배포
 * @param {String}  stage - 배포 환경
 * @returns {*}
 */
const deploy = stage => {
  const deployEnv = _.lowerCase(envConfig.get('AWS_EB_DEPLOY_ENV'));
  let seriesFunctions = [];

  switch (deployEnv) {
    case 'docker':
      seriesFunctions = [cleaner.clean,
        builder.build,
        docker.dockerBuild(stage),
        docker.dockerPush(stage),
        compress.compressDistForDocker,
        upload(stage),
      ];
      break;
    case 'node':
      seriesFunctions = [
        cleaner.clean,
        builder.build,
        compress.compressDist,
        upload(stage),
      ];
      break;
    default:
      throw new Error('Not Found Deploy Environment');
  }

  return gulp.series(seriesFunctions);
};

module.exports = {
  upload,
  deploy,
};
