import Koa from 'koa';
import history from 'koa2-connect-history-api-fallback';
import serve from 'koa-static';
import path from 'path';
import { BrowserWindow } from 'electron';
import Router from '@koa/router';
import BodeyParser from 'koa-bodyparser';
import errorCatcher from '../middleware/errorCatcher';
import update from 'immutability-helper';
import constant from '../common/constant';

class KoaService {
  static instance: KoaService | null = null;
  windows: BrowserWindow[] = [];
  koaApp: Koa = new Koa();
  constructor(windows?: BrowserWindow[]) {
    if (!KoaService.instance) {
      this.windows = windows || [];
      const koaApp = this.koaApp || new Koa();
      koaApp.context.throwProxy = (status, msg, data) => {
        const baseBody = update(constant.responseBody, {
          msg: {
            $set: msg,
          },
        });
        const reponseBody = data
          ? update(baseBody, { $merge: data })
          : baseBody;
        koaApp.context.throw(status, msg, reponseBody);
      };
      koaApp
        .use(errorCatcher())
        .use(history({ index: 'index.html', whiteList: ['/api'] }))
        .use(BodeyParser())
        .use(serve(path.resolve(__dirname, '../dist')))
        .listen(8989);
      this.koaApp = koaApp;
      KoaService.instance = this;
    }
    return KoaService.instance;
  }
  static getInstance() {
    if (!this.instance) {
      return (this.instance = new KoaService([]));
    }
    return this.instance;
  }
  useRouter(router: Router<any, any>) {
    router.prefix('/api');
    this.koaApp.use(router.routes());
  }
}

export default KoaService;
