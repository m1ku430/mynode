'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const token = app.middleware.token(this.ctx);
  router.get('/', controller.home.index); // 主页
  router.get('/delsign', controller.home.delsign);
  router.post('/signin', token, controller.home.signin); // 签到
  router.post('/login', controller.home.login);// 登录
  router.post('/logout', controller.home.logout);// 登出
};
