const fs = require('fs');

module.exports = class Properties {
  /**
   * Properties Constructor
   * @param {String}  path  - 요청 경로
   */
  constructor(path) {
    const map = {};
    if (fs.existsSync(path)) {
      this.file = fs.readFileSync(path, { encoding: 'UTF-8' });

      if (!this.file) {
        throw new Error('유효하지 않은 경로(`path`)가 입력되었습니다.');
      }

      this.file = this.file.replace(/\r/g, '');

      this.file.split('\n')
        .map((item) => {
          if (item.indexOf('=') !== -1) {
            return item.split('=').map(value => value.trim());
          }
          return null;
        })
        .filter(keyValue => (keyValue && keyValue.length === 2))
        .forEach((keyValue) => {
          map[keyValue[0]] = keyValue[1];
        });
    }
    this.map = map;
  }

  /**
   * Get Env Value
   * @param {String} key  - env Key
   * @returns {*}
   */
  get(key) {
    return this.map[key].trim();
  }

  getMap() {
    return this.map;
  }
};
