const ua = window.navigator.userAgent.toLowerCase();

export const env = {
  get isInWeixin() {
    return ua.indexOf("micromessenger") !== -1;
  },
  get isInApp() {
    return /(^|;\s)app\//.test(ua)
  },
  get isInIOS() {
    return ua.match(/(iphone|ipod|ipad);?/i);
  },
  get isInAndroid() {
    return ua.match(/android|adr/i);
  },
  get isInPc() {
    return !(this.isInAndroid || this.isInApp || this.isInIOS || this.isInWeixin)
  },
  get platform(): "PC" | "Mobile" {
    return this.isInPc ? "PC" : "Mobile";
  }
}


export const IS_IOS = env.isInIOS;