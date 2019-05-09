'use strict';

// 权限中间件
module.exports = () => {
  return async function token(ctx, next) {
    const result = await ctx.model.Signin.find(
      { userid: '002' }
    );
    if (result[0].token === null) {
      ctx.body = { info: { data: '没有权限', count: 0, continuousCount: 0, goldCoins: 0 } };
      return;
    }
    await next();
  };
};
