import { createClient, WebDAVClient, WebDAVClientOptions } from 'webdav';

class WebDAV {
  static instance: WebDAV | null = null;
  client: null | WebDAVClient = null;
  constructor(remoteURL?: string, options?: WebDAVClientOptions) {
    if (!WebDAV.instance) {
      remoteURL && (this.client = createClient(remoteURL, options));
      WebDAV.instance = this;
    }
    return WebDAV.instance;
  }
  static getInstance() {
    if (!this.instance) {
      return (this.instance = new WebDAV());
    }
    if (!this.instance.client) {
      throw 'client need init';
    }
    return this.instance;
  }
  setClient(client: WebDAVClient) {
    this.client = client;
  }
  resetClient() {
    this.client = null;
  }
  hasLogin() {
    return !!this.client;
  }
}

export default WebDAV;
