'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SigninSchema = new Schema({
    // 用户ID
    userid: { type: String, index: 1 },
    // 总签到次数
    count: { type: Number, default: 0 },
    // 连续签到次数
    continuousCount: { type: Number },
    // 最后签到时间
    lastSignTime: { type: String },
    // 金币总数
    goldCoins: { type: Number },
    // Token认证
    token: { type: String, default: null },
    // 表更新时间
    update_at: { type: Date },
    // 表创建时间
    create_at: { type: Date, default: Date.now() },
    // 用户签到历史记录
    date: [
      { sign_his: { type: Date } },
    ],
  });

  return mongoose.model('Signin', SigninSchema, 'Signin');
};
