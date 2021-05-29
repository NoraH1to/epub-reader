import Router from '@koa/router';
import { createClient } from 'webdav';
import WebDAV from '../common/webDAV';
import update from 'immutability-helper';
import constant from '../common/constant';
import Koa from 'koa';

const router = new Router<any, Koa.Context>();
const webDAV = new WebDAV();

const checkLogin = (
  ctx: Koa.ParameterizedContext<
    any,
    Koa.Context & Router.RouterParamContext<any, Koa.Context>,
    any
  >,
) => {
  !webDAV.hasLogin() && ctx.throwProxy(401, 'need login');
};

const getDirectoryContents: Router.Middleware<any, Koa.Context> = async (
  ctx,
) => {
  checkLogin(ctx);
  const { value } = ctx;
  await webDAV.client
    ?.getDirectoryContents(value.path, { deep: !!value.deep, glob: '*.{epub}' })
    .then((res) => {
      ctx.body = update(constant.responseBody, {
        $merge: {
          data: res,
        },
      });
    })
    .catch((err) => {
      ctx.throwProxy(err.response.status, err.response.statusText);
    });
};
router.get('/webDAV/getDirectoryContents', getDirectoryContents);

const getFileDownloadLink: Router.Middleware<any, Koa.Context> = async (
  ctx,
) => {
  checkLogin(ctx);
  const { value } = ctx;
  ctx.body = webDAV.client?.getFileDownloadLink(value.fileName);
};
router.get('/webDAV/getFileDownloadLink', getFileDownloadLink);

const login: Router.Middleware<any, Koa.Context> = async (ctx) => {
  const { value } = ctx;
  await createClient(value.host, {
    username: value.username,
    password: value.password,
  })
    .getDirectoryContents('/')
    .then(() => {
      webDAV.setClient(
        createClient(value.host, {
          username: value.username,
          password: value.password,
        }),
      );
      ctx.body = constant.responseBody;
    })
    .catch((err) => {
      !webDAV.hasLogin() && webDAV.resetClient();
      ctx.throwProxy(err.response.status, err.response.statusText);
    });
};
router.post('/webDAV/login', login);

export default router;
