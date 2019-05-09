'use strict';

const Service = require('egg').Service;
// 登录服务
class LoginService extends Service {
  async login(user_id) {
    const { ctx } = this;
    await ctx.model.Signin.updateOne({
      userid: user_id,
    }, {
      token: '123456',
    });
    return { data: '登录成功', err: NaN, count: 0, continuousCount: 0, goldCoins: 0 };
  }
}

module.exports = LoginService;
