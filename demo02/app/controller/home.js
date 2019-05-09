'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 首页
  async index() {
    const { ctx, service } = this;
    const title = '首页';
    const info = await service.signin.index();
    const count = info.count;
    const continuousCount = info.continuousCount;
    const goldCoins = info.goldCoins;
    await ctx.render('index', {
      title,
      count,
      continuousCount,
      goldCoins,
    });
  }
  // 签到
  async signin() {
    const { ctx, service } = this;
    // 获取用户ID
    // const { body: { request: { userid: user_id } } } = ctx;
    const { userid: user_id } = ctx.request.body;
    const info = await service.signin.signin(user_id);
    ctx.body = {
      info,
    };
    ctx.status = 200;
  }
  // 登录
  async login() {
    const { ctx, service } = this;
    const { userid: user_id } = ctx.request.body;
    const info = await service.login.login(user_id);
    ctx.body = {
      info,
    };
  }
  // 登出
  async logout() {
    const { ctx, service } = this;
    const { userid: user_id } = ctx.request.body;
    const info = await service.logout.logout(user_id);
    ctx.body = {
      info,
    };
  }
  // 删除用户
  async delsign() {
    await this.service.signin.delsign();
  }
}

module.exports = HomeController;
