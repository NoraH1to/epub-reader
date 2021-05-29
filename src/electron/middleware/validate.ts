import constant from '../common/constant';
import { DefaultContext, DefaultState, Middleware } from 'koa';
import Joi from 'joi';

const getTargetByArr = <T = any>({
  arr,
  obj,
}: {
  arr: string[];
  obj: any & Object;
}): T => {
  arr = arr.filter((key) => key !== '' && key !== null && key !== undefined);
  if (arr.length === 0) throw 'empty array';
  arr.forEach((key) => {
    if (obj.hasOwnProperty(key)) obj = obj[key];
    else return undefined;
  });
  return obj;
};

const validate = (): Middleware<
  DefaultState,
  DefaultContext & { value: any; error?: string },
  any
> => async (ctx, next) => {
  const {
    method,
    request: { query, body, path },
  } = ctx;
  let validateTarget;
  method === 'GET' ? (validateTarget = query) : (validateTarget = body);
  const { value, error } = getTargetByArr<Joi.ObjectSchema<any>>({
    arr: path.replace('/api', '').split('/').slice(1),
    obj: constant.joiSchema,
  }).validate(validateTarget);
  ctx.value = value;
  ctx.error = error?.message;
  if (error) {
    ctx.throwProxy(502, error.message);
  } else {
    await next();
  }
};

export default validate;
