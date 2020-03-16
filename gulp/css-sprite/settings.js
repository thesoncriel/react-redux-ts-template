let setting;
try {
  setting = require('../../css-sprite.settings.json');
} catch (e) {
  setting = {};
}

const ROOT_PATH = '.';
const TARGET_PATH = `${ROOT_PATH}/gulp/css-sprite/images`;
const SAVE_PATH = `${ROOT_PATH}/static/sprite/`;
const SASS_FILE_PATH = `${ROOT_PATH}/src/styles/libs/sprite/`;
const CDN_IMAGE_URL = '/static';
const TARGET_PIXEL_RATIO = 3;

const defaultSettings = {
  ROOT_PATH,
  TARGET_PATH,
  SAVE_PATH,
  SASS_FILE_PATH,
  CDN_IMAGE_URL,
  TARGET_PIXEL_RATIO,
};

module.exports = {
  ...defaultSettings,
  ...setting,
};
