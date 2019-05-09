'use strict';

const Service = require('egg').Service;

class SigninService extends Service {
  // 首页
  async index() {
    const result = await this.ctx.model.Signin.findOne(
      { userid: '002' }
    );
    return {
      data: result.data,
      count: result.count,
      continuousCount: result.continuousCount,
      goldCoins: result.goldCoins };
  }
  // 签到
  async signin(user_id) {
    const { ctx } = this;
    // 获取用户当前签到的日期
    const { signindate: signindate } = ctx.request.body;
    // 转换成时间戳格式
    const signindate_t = new Date(signindate).getTime();
    // 从数据库中取出用户信息
    const result = await ctx.model.Signin.findOne(
      { userid: user_id }
    );
    // 取出用户上次签到的日期
    const lastsigntime = result[0].lastSignTime;
    // 转换成时间戳格式
    const lastsigntime_t = new Date(lastsigntime).getTime();
    // 计算两次签到的时间差
    const time_diff = signindate_t - lastsigntime_t;
    if (time_diff < 86400000) {
      return { data: '今天已经签过到了',
        err: null, count: result[0].count,
        continuousCount: result[0].continuousCount,
        goldCoins: result[0].goldCoins,
        sign_histry: result[0].date };
    }
    if (time_diff === 86400000) {
      // 总签到次数+1
      const count = result[0].count + 1;
      // 连续签到天数就+1
      const continuousCount = result[0].continuousCount + 1;
      // 金币总数 = 用户上次的金币数 + 10 x 连续签到天数
      const goldCoins = result[0].goldCoins + 10 * continuousCount;
      // 更新数据库
      const sign_his = await ctx.model.Signin.findOneAndUpdate({
        userid: '002',
      }, {
        count,
        continuousCount,
        lastSignTime: signindate,
        goldCoins,
        update_at: Date.now(),
        $addToSet: { date: [{ sign_his: signindate }] },
      }, {
        new: true,
        upsert: true,
        fields: 'date',
      }, function(err, docs) {
        if (err) console.log(err);
        console.log('更新成功:' + docs);
      });
      const sign_histry = sign_his.date;
      return { data: '已经签到成功',
        err: null,
        count,
        continuousCount,
        goldCoins,
        sign_histry };
    }
    if (time_diff > 86400000) {
      // 总签到次数+1
      const count = result[0].count + 1;
      // 连续签到次数归零
      const continuousCount = 0;
      // 金币数就 = 当前金币数+10
      const goldCoins = result[0].goldCoins + 10;
      // 更新数据库
      const sign_his = await ctx.model.Signin.findOneAndUpdate({
        userid: '002',
      }, {
        count,
        continuousCount,
        lastSignTime: signindate,
        goldCoins,
        update_at: Date.now(),
        $addToSet: { date: [{ sign_his: signindate }] },
      }, {
        new: true,
        upsert: true,
        fields: 'date',
      }, function(err, docs) {
        if (err) console.log(err);
        console.log('更新成功:' + docs);
      });
      const sign_histry = sign_his[0];
      return { data: '已经签到成功',
        err: null,
        count,
        continuousCount,
        goldCoins,
        sign_histry };
    }
  }
}


module.exports = SigninService;
