const _ = require('lodash');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const { paths, pipelineConfig } = require('./constant');

const ECS_ARTIFACTS = Object.freeze('Artifacts.json');
const BEANSTALK_ARTIFACTS = Object.freeze('Dockerrun.aws.json');

/**
 * Write Artifacts
 * @param definition
 * @param fileName
 * @returns {Promise<void>}
 */
const writeArtifacts = (definition, fileName) => {
  const filePath = `${paths.dist}/${fileName}`;
  return writeFile(filePath, JSON.stringify(definition, null, 2));
};

/**
 * Write Artifacts For ECS
 * @returns {Promise<void>}
 */
const artifactEcs = () => {
  const definition = [{
    name: pipelineConfig.ECS_SERVICE_CONTAINER_NAME,
    imageUri: pipelineConfig.LATEST_REGISTRY_PATH,
  }];

  return writeArtifacts(definition, ECS_ARTIFACTS);
};

/**
 * Write Artifacts For Beanstalk
 * @returns {Promise<void>}
 */
const artifactBeanstalk = () => {
  const definition = {
    AWSEBDockerrunVersion: '1',
    Image: {
      Name: pipelineConfig.LATEST_REGISTRY_PATH,
      Update: 'true',
    },
    Ports: [
      {
        ContainerPort: pipelineConfig.CONTAINER_PORT,
      }],
    Volumes: [],
    Logging: '/var/log/nodejs',
  };

  return writeArtifacts(definition, BEANSTALK_ARTIFACTS);
};

/**
 * Write Artifact By DeployTarget
 * @returns {Promise<void>}
 */
const artifact = () => {
  const { DEPLOY_TARGET } = pipelineConfig;

  switch (_.lowerCase(DEPLOY_TARGET)) {
    case 'beanstalk':
      return artifactBeanstalk();
    case 'ecs':
      return artifactEcs();
    default:
      throw new Error(`'${DEPLOY_TARGET}' deploy target is not support.`);
  }
};

module.exports = {
  artifact,
  artifactEcs,
  artifactBeanstalk,
};
