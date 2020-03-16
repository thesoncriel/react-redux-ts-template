const gulp = require('gulp');

const builder = require('./builder');
const cleaner = require('./cleaner');
const deploy = require('./deploy');
const docker = require('./docker');
const awsPipeline = require('./aws-pipeline');

gulp.task('clean', cleaner.clean);
gulp.task('clean:dist', cleaner.cleanDist);
gulp.task('clean:temp', cleaner.cleanTemp);

gulp.task('build', builder.build);

/**
 * Elastic Beanstalk 수동 배포 환경에서 사용
 */
gulp.task('deploy:test', deploy.deploy('test'));
gulp.task('deploy:prod', deploy.deploy('production'));

/**
 * CodePipeline 배포용 Gulp Script
 */
gulp.task('docker:login', docker.codePipeline.dockerLogin);
gulp.task('docker:build', docker.codePipeline.dockerBuild);
gulp.task('docker:push', docker.codePipeline.dockerPush);
gulp.task('docker:build-push', gulp.series(
  cleaner.clean,
  builder.build,
  docker.codePipeline.dockerLogin,
  docker.codePipeline.dockerBuild,
  docker.codePipeline.dockerPush,
));
gulp.task('aws-pipeline:artifact', awsPipeline.artifact);
// gulp.task('aws-pipeline:artifact:ecs', awsPipeline.artifactEcs);
// gulp.task('aws-pipeline:artifact:beanstalk', awsPipeline.artifactBeanstalk);
