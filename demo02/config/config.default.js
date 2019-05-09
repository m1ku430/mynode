/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557214589587_9127';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    mapping: { '.html': 'ejs' },
  };
  exports.mongoose = {
    url: 'mongodb://127.0.0.1:27017/test',
    options: {},
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
