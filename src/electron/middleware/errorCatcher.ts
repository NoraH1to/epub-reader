import Koa from 'koa';

const errorCatcher = (): Koa.Middleware<
  Koa.DefaultState,
  Koa.DefaultContext & { value: any; error?: string },
  any
> => async (ctx, next) => {
  await next().catch((err: { status: number } & ResponseBody & Error) => {
    const { status, message, msg, data } = err;
    ctx.status = status;
    ctx.message = message;
    ctx.body = {
      data,
      msg,
    };
  });
};

export default errorCatcher;
