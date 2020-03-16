/**
 * 패키지 상수
 */
const pkg = require('../../package.json');

/**
 * 대표 경로 상수
 */
const publicPath = 'public';
const clientPath = 'client';
const serverPath = 'server';

/**
 * 경로 상수
 */
const paths = {
  next: {
    builds: './.next/**',
    pages: `./pages/**`,
    src: `./src/**`,
    assets: `./static/**`,
    environments: `./environments/**`,
    configs: [
      '.babelrc',
      './next.config.js',
      './next.config.js',
      './package.json',
      './tsconfig.json',
      './tslint.json',
    ]
  },
  client: {
    assets: `${clientPath}/assets/**/*`,
    images: `${clientPath}/assets/images/**/*`,
    scripts: [
      `${clientPath}/**/!(*.spec|*.mock).js`,
      `!${clientPath}/bower_components/**/*`,
    ],
    styles: [
      `${clientPath}/**/*.css`,
    ],
    bundleScript: `${clientPath}/assets/bundle.js`,
    bundleStyle: `${clientPath}/assets/bundle.css`,
    vendorScript: `${clientPath}/assets/vendor*`,
    mainStyle: `${clientPath}/index.css`,
    mainScript: `${clientPath}/index.js`,
    mainView: `${clientPath}/index.html`,
  },
  server: {
    views: [
      `${serverPath}/views/*`,
    ],
    scripts: [
      `${serverPath}/**/!(*.spec|*.integration).js`,
      `!${serverPath}/node_modules/**/*`,
    ],
    json: [`${serverPath}/**/*.json`],
    test: {
      integration: [`${serverPath}/**/*.integration.js`, 'mocha.global.js'],
      unit: [`${serverPath}/**/*.spec.js`, 'mocha.global.js'],
    },
  },
  dist: 'dist',
};
paths.docs = {
  receipt: {
    swagger: `${paths.dist}/swagger-receipt.json`,
    html: `${paths.dist}/receipt.html`,
    s3: 'receipt.html',
  },
  reservation: {
    swagger: `${paths.dist}/swagger-reservation.json`,
    html: `${paths.dist}/reservation.html`,
    s3: 'reservation.html',
  },
};

const pipelineConfig = {
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || 'ap-northeast-2',
  AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID || '982190745434',
  VPC_ID: process.env.VPC_ID || 'vpc-ff499a96',

  /**
   * ECS 서비스 내의 컨테이너명을 적는다.
   */
  ECS_SERVICE_CONTAINER_NAME: process.env.ECS_SERVICE_CONTAINER_NAME,

  /**
   * 배포 대상을 지정한다. (ECS | BEANSTALK)
   */
  DEPLOY_TARGET: process.env.DEPLOY_TARGET || 'ECS',

  /**
   * ECR 저장소 이름
   */
  ECR_REPO_NAME: process.env.ECR_REPO_NAME,

  /**
   * Dockerfile에 입력한 노출 포트 번호
   */
  CONTAINER_PORT: process.env.CONTAINER_PORT || '8080',

  get ECR_URL() {
    return `${this.AWS_ACCOUNT_ID}.dkr.ecr.${this.AWS_DEFAULT_REGION}.amazonaws.com`;
  },
  get REGISTRY_PATH_WITH_VERSION() {
    return `${this.ECR_URL}/${this.ECR_REPO_NAME}:${pkg.version}`;
  },
  get LATEST_REGISTRY_PATH() {
    return `${this.ECR_URL}/${this.ECR_REPO_NAME}:latest`;
  },
};

module.exports = {
  pkg,
  publicPath,
  clientPath,
  serverPath,
  paths,
  pipelineConfig,
};
