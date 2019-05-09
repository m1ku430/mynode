'use strict';

const Service = require('egg').Service;
// 登出服务
class LogoutService extends Service {
  async logout(user_id) {
    const { ctx } = this;
    await ctx.model.Signin.updateOne({
      userid: user_id,
    }, {
      token: null,
    });
    return { data: '已登出', err: NaN, count: 0, continuousCount: 0, goldCoins: 0 };
  }
}

module.exports = LogoutService;
