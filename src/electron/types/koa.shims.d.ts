import 'koa';

declare module 'koa' {
  interface DefaultContext {
    value?: any;
    error?: string;
    throwProxy: (status: number, msg: string, data?: any) => void;
  }
}
