const _ = require('lodash');
const gulp = require('gulp');
const replace = require('replace-in-file');
const childProcess = require('child_process');
const util = require('util');

const constant = require('./constant');
const Properties = require('./Properties');

const { paths, pipelineConfig } = require('./constant');

const exec = util.promisify(childProcess.exec);
const envConfig = new Properties('.env');
const { spawn } = childProcess;

/**
 * Docker Image Tag 명 반환
 *
 * @param {String}  stage - 배포 환경
 * @returns {String}
 */
const getImageTag = (stage) => {
  const tag = envConfig.get('DOCKER_IMAGE_TAG');
  const { version } = constant.pkg;
  if (_.isEmpty(tag)) {
    throw new Error('TAG Not Found');
  }
  return `${tag}/${stage}:${version}`;
};

/**
 * AWS Elastic Beanstalk Docker 배포 파일 이미지 경로 변경
 *
 * @param {String}  stage - 배포 환경
 */
const setDockerRunAwsImagePath = (stage) => {
  const imagePath = envConfig.get('DOCKER_IMAGE_TAG');
  const imageName = `${imagePath}/${stage}:${constant.pkg.version}`;
  const options = {
    files: `${constant.paths.dist}/Dockerrun.aws.json`,
    from: '<IMAGE_NAME>',
    to: imageName,
  };
  replace(options);
};

/**
 * Execute Sell Command
 *
 * @param {String}  command - 명령어
 * @param {Array<String>} args  - 입력
 * @param {Function}  cb  - Call Back Function
 */
const execCommand = (command, args, cb) => {
  const ctx = spawn(command, args);
  ctx.stdout.on('data', (data) => {
    process.stdout.write(data);
  });
  ctx.stderr.on('data', (data) => {
    process.stderr.write(data);
  });
  ctx.on('close', (code) => {
    if (cb) { cb(code === 0 ? null : code); }
  });
};

/**
 * Docker Build Command
 *
 * @param {String}  state - 환경명
 * @param {Function}  cb  - Call Back Function
 */
const dockerBuildCommandExec = (state, cb) => {
  const dockerTag = getImageTag(state);
  execCommand('docker', ['build', '-t', dockerTag, `${constant.paths.dist}/.`], cb);
};

/**
 * Docker Login
 *
 * @param {Function}  cb  - CallBack
 */
const dockerLogin = (cb) => {
  const id = envConfig.get('DOCKER_REGISTRY_ID');
  const pw = envConfig.get('DOCKER_REGISTRY_PW');
  const registry = envConfig.get('DOCKER_REGISTRY_URL');
  execCommand('docker', ['login', '-u', id, '-p', pw, registry], cb);
};

/**
 * Docker Image Build
 *
 * @param {String}  stage - 배포 환경
 * @returns {function(*=): void}
 */
const dockerBuild = stage => (cb) => {
  setDockerRunAwsImagePath(stage);
  return dockerBuildCommandExec(stage, cb);
};

/**
 * Docker Build Image Push
 *
 * @param {String}  state - 배포 환
 * @returns {function(*=): void}
 */
const dockerPush = state => gulp.series(dockerLogin, (cb) => {
  const dockerTag = getImageTag(state);
  execCommand('docker', ['push', dockerTag], cb);
});

const codePipeline = {
  dockerLogin: () => exec(`$(aws ecr get-login --no-include-email --region ${pipelineConfig.AWS_DEFAULT_REGION})`),
  dockerBuild: async () => exec(`docker build -t ${pipelineConfig.REGISTRY_PATH_WITH_VERSION} `
      + `-t ${pipelineConfig.LATEST_REGISTRY_PATH} ${paths.dist}/.`),
  dockerPush: async () => {
    await exec(`docker push ${pipelineConfig.REGISTRY_PATH_WITH_VERSION}`);
    await exec(`docker push ${pipelineConfig.LATEST_REGISTRY_PATH}`);
  },
};

module.exports = {
  dockerLogin,
  dockerBuild,
  dockerPush,
  codePipeline,
};
